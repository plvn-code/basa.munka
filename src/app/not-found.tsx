import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container not-found">
      <div>
        <b>404</b>
        <h1 className="title">
          Сторінку <em>не знайдено</em>
        </h1>
        <p className="lead">Можливо, її перенесли або модель уже розпродали. Зазирніть у каталог — там багато гарного.</p>
        <Link href="/shop" className="btn">
          До каталогу
        </Link>
      </div>
    </div>
  );
}
