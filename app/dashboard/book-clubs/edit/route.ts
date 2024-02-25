import { NextRequest, NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { revalidatePath } from 'next/cache';

import { DEFAULT_WORD_PAGE } from '../../../../constants';
import { EDIT_BOOK_CLUB } from '../../../../queries';
import { getClient } from '../../../../apollo-client';

export async function POST(request: NextRequest) {
  const headersList = headers();
  const referer = headersList.get('referer') || DEFAULT_WORD_PAGE;
  const bookClubId = request.nextUrl.searchParams.get('bookClubId') as string;
  const formData = await request.formData();
  const description = formData.get('description');
  const name = formData.get('name');
  const theme = formData.get('theme');
  const client = getClient();

  try {
    await client.mutate<{ data: unknown }>({
      mutation: EDIT_BOOK_CLUB,
      variables: { input: { bookClubId: parseInt(bookClubId), description, name, theme } },
    });
    revalidatePath(`/dashboard/book-clubs/${bookClubId}/edit`);
    return NextResponse.redirect(new URL(referer), 303);
  } catch (error) {
    console.log('error', error);
  }
}
