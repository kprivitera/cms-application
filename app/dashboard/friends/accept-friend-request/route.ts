import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { ACCEPT_FRIEND_REQUEST } from '../../../../queries';
import { DEFAULT_WORD_PAGE } from '../../../../constants';
import { getClient } from '../../../../apollo-client';

export async function POST(request: NextRequest) {
  const friendRequestId = request.nextUrl.searchParams.get('friendRequestId');

  if (!friendRequestId) {
    return null;
  }
  console.log(friendRequestId);

  const headersList = headers();
  const referer = headersList.get('referer') || DEFAULT_WORD_PAGE;
  const client = getClient();

  try {
    await client.mutate<{ data: unknown }>({
      mutation: ACCEPT_FRIEND_REQUEST,
      variables: { friendRequestId: parseInt(friendRequestId) },
    });
    revalidatePath(referer);
    return NextResponse.redirect(new URL(referer), 303);
  } catch (error) {
    console.log(error);
  }
}
