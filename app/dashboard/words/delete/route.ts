import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';

import { DELETE_WORD } from '../../../../queries';
import { getClient } from '../../../../apollo-client';

export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get('id');
  console.log('id', id);

  const client = getClient();
  const deletedWord = await client.mutate<{ data: unknown }>({
    mutation: DELETE_WORD,
    variables: { id },
  });
  console.log('deletedWord: ', deletedWord);
  redirect('/dashboard/words');

  return null;
}
