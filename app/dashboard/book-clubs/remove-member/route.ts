import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { DEFAULT_WORD_PAGE } from '../../../../constants';
import { REMOVE_CLUB_MEMBER } from '../../../../queries';
import { getClient } from '../../../../apollo-client';

export async function POST(request: NextRequest) {
  const headersList = headers();
  const referer = headersList.get('referer') || DEFAULT_WORD_PAGE;
  const bookClubId = request.nextUrl.searchParams.get('bookClubId') as string;
  const userId = request.nextUrl.searchParams.get('memberId') as string;
  const client = getClient();

  try {
    await client.mutate<{ data: unknown }>({
      mutation: REMOVE_CLUB_MEMBER,
      variables: { input: { bookClubId: parseInt(bookClubId), userId: parseInt(userId) } },
    });
    revalidatePath(`/dashboard/book-clubs/${bookClubId}/edit`);
    return NextResponse.redirect(new URL(referer), 303);
  } catch (error) {
    console.log('error', error);
  }
}
