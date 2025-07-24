import connectMongo from '@/lib/db';
import Affiliate from '@/models/Affiliate';

import { getAuthUser } from '@/lib/auth';

export async function GET(req) {
  await connectMongo();
  const user = await getAuthUser(req);
  if (!user) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 });
  }

  console.log("user",user)

  const affiliate = await Affiliate.findById(user.id);
  if (!affiliate) {
    return new Response(JSON.stringify({ message: 'Affiliate account not found' }), { status: 404 });
  }

  const referralLink = `${process.env.NEXT_PUBLIC_API_URL}/?ref=${affiliate.referralCode}`;

  return new Response(JSON.stringify({
    referralLink,
    totalEarned: affiliate.totalEarned || 0,
    currentBalance: affiliate.currentBalance || 0,
  }));
}
