import { FixedSizeList, ListChildComponentProps } from "react-window";
import { Book } from ".";

const renderBookRow = ({
  index,
  style,
  data,
}: ListChildComponentProps<Book[]>) => {
  const className = `flex justify-start items-center px-4 h ${
    index % 2 === 0 ? "bg-gray-50" : "bg-white"
  }`;
  const book = data[index];
  window.console.log(`Book ${index}`, book);
  // To get the book's cover image please use the "cover_i" value
  // `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`;

  return (
    <div className={className} style={style}>
      <img
        width="90"
        src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
      ></img>
      <span className="ml-10">{book.title}</span>
    </div>
  );
};
interface bookProps {
  books: Book[];
}
const BookList = ({ books }: bookProps) => (
  <FixedSizeList
    className="border border-slate-300 rounded-md"
    height={500}
    itemCount={books.length}
    itemSize={150}
    width={500}
    itemData={books}
  >
    {/* 
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore */}
    {renderBookRow}
  </FixedSizeList>
);

export { BookList };
