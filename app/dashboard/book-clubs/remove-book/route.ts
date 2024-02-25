import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { DEFAULT_WORD_PAGE } from '../../../../constants';
import { REMOVE_CLUB_BOOK } from '../../../../queries';
import { getClient } from '../../../../apollo-client';

export async function POST(request: NextRequest) {
  const headersList = headers();
  const referer = headersList.get('referer') || DEFAULT_WORD_PAGE;
  const bookClubId = request.nextUrl.searchParams.get('bookClubId') as string;
  const bookId = request.nextUrl.searchParams.get('bookId') as string;
  const client = getClient();

  try {
    await client.mutate<{ data: unknown }>({
      mutation: REMOVE_CLUB_BOOK,
      variables: { input: { bookClubId: parseInt(bookClubId), bookId: parseInt(bookId) } },
    });
    revalidatePath(`/dashboard/book-clubs/${bookClubId}/edit`);
    return NextResponse.redirect(new URL(referer), 303);
  } catch (error) {
    console.log('error', error);
  }
}
