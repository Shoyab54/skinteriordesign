import { Fragment } from "react";

export const Marquee = ({ items }) => {
  const row = (key) => (
    <span className="marquee-line" key={key} aria-hidden={key === 1}>
      {items.map((item, i) => (
        <Fragment key={item}>
          {i % 2 ? <em>{item}</em> : item}
          <i className="mq-dot">✦</i>
        </Fragment>
      ))}
    </span>
  );
  return (
    <div className="marquee" data-testid="editorial-marquee" aria-hidden="true">
      <div className="marquee-track">{[row(0), row(1)]}</div>
    </div>
  );
};
