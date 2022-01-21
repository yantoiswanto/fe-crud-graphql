import React from 'react';
import { Link } from 'react-router-dom';

import { GET_BOOKS, DELETE_BOOK } from 'graphql/books';
import { useQuery, useMutation } from '@apollo/client';

export default function List(props) {
  const [id, setId] = React.useState(null);
  const { loading, error, data } = useQuery(GET_BOOKS, {
    fetchPolicy: 'no-cache',
  });

  const [deleteBook, { loading: loadingDeleteBook, error: errorDeleteBook }] =
    useMutation(DELETE_BOOK, {
      refetchQueries: [GET_BOOKS],
      onError: (res) => {
        console.log(res.networkError);
      },
    });

  function fnDelete(_id) {
    setId(_id);
    deleteBook({
      variables: {
        _id,
      },
    });
  }

  if (loading) return 'Loading...';
  if (error)
    return error?.graphQLErrors.map((error) => error) ?? error.networkErrors;
  if (data.getAllBooks.length === 0)
    return (
      <h1>
        TIdak ada Data<Link to="/books/new">Tambah Buku</Link>
      </h1>
    );

  return (
    <div>
      <h1>
        List buku
        <Link to="/books/new" style={{ fontsize: 14 }}>
          (+ Buat Buku)
        </Link>
      </h1>
      {data.getAllBooks.map((book) => {
        return (
          <div key={book._id}>
            {book.title}(<Link to={`/books/${book._id}/edit`}>Edit</Link>)(
            <span
              style={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: 'blue',
              }}
              onClick={() => fnDelete(book._id)}
            >
              {id === book._id && loadingDeleteBook ? 'Deleting...' : 'Delete'}
            </span>
            )
          </div>
        );
      })}
    </div>
  );
}
