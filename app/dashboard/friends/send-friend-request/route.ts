import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { DEFAULT_WORD_PAGE } from '../../../../constants';
import { SEND_FRIEND_REQUEST } from '../../../../queries';
import { getClient } from '../../../../apollo-client';

export async function POST(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const friendId = request.nextUrl.searchParams.get('friendId');

  if (!userId || !friendId) {
    return null;
  }

  const headersList = headers();
  const referer = headersList.get('referer') || DEFAULT_WORD_PAGE;
  const client = getClient();

  console.log({ userId, friendId });
  try {
    await client.mutate<{ data: unknown }>({
      mutation: SEND_FRIEND_REQUEST,
      variables: { friendId: parseInt(friendId), userId: parseInt(userId) },
    });
    revalidatePath(referer);
    return NextResponse.redirect(new URL(referer), 303);
  } catch (error) {
    console.log(error);
  }
}
