// /app/api/admin/affiliate/withdrawals/[id]/route.js
import { NextResponse } from 'next/server';
import connectMongo from '@/lib/db';
import { getAuthUser } from '@/lib/getAuthUser';
import AffiliateWithdrawal from '@/models/AffiliateWithdrawal';

export async function PATCH(req, { params }) {
  await connectMongo();
  const user = await getAuthUser();

  if (!user || user.role !== 'admin') {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = params;
  const { action } = await req.json(); // 'approve' or 'reject'

  const withdrawal = await AffiliateWithdrawal.findById(id);
  if (!withdrawal) {
    return NextResponse.json({ message: 'Withdrawal not found' }, { status: 404 });
  }

  if (withdrawal.status !== 'pending') {
    return NextResponse.json({ message: 'Already processed' }, { status: 400 });
  }

  if (action === 'approve') {
    withdrawal.status = 'approved';
    withdrawal.processedAt = new Date();
    await withdrawal.save();
    return NextResponse.json({ message: 'Withdrawal approved' });
  } else if (action === 'reject') {
    // Refund balance
    const affiliate = await Affiliate.findById(withdrawal.affiliate);
    affiliate.currentBalance += withdrawal.amount;
    await affiliate.save();

    withdrawal.status = 'rejected';
    withdrawal.processedAt = new Date();
    await withdrawal.save();
    return NextResponse.json({ message: 'Withdrawal rejected and refunded' });
  } else {
    return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  }
}
