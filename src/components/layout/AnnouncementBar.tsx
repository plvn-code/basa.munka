const messages = [
  "Сучасна українська естетика у вишивці",
  "100% натуральний льон",
  "Лімітовані колекції",
  "Доставка по всій Україні",
  "Вишиваємо ваше лого на скатертині",
  "Зроблено в Україні",
];

/** Chocolate marquee above the header — lines from the @basamunka bio; rhombus separators echo the logo. */
export function AnnouncementBar() {
  const row = (hidden?: boolean) => (
    <span aria-hidden={hidden || undefined}>
      {messages.map((m) => (
        <span key={m} style={{ padding: 0 }}>
          {m}
          <i />
        </span>
      ))}
    </span>
  );
  return (
    <div className="ticker" role="region" aria-label="Оголошення">
      <div className="ticker__track">
        {row()}
        {row(true)}
      </div>
    </div>
  );
}
