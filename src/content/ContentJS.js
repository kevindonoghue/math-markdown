import React from "react";
import { $, $$ } from "../components/KatexComponents";

const Content = () => (
  <div>
    <h2>Hello, world!</h2>
    <p>
      What's up? <$>\int_0^1 x^2 dx</$>{" "}
    </p>
    <$$>\int_0^1 x^2 dx</$$>
    <$$>\bpm 1 & 1 \\ 0 & 1\epm</$$>
    <$>{`e^{x^2}`}</$>

    <p>
      Deserunt excepteur incididunt labore sunt dolor et. Mollit fugiat amet qui
      exercitation commodo velit eiusmod esse adipisicing. Mollit elit
      reprehenderit mollit aliquip. <$>{String.raw`\frac{1}{3}`}</$> Aute esse
      dolore non sint mollit. Deserunt non reprehenderit occaecat ad aute
      exercitation proident deserunt ipsum veniam nostrud eu ad cillum.
    </p>

    <p>
      Nulla qui cupidatat do sunt laborum excepteur. Excepteur sunt incididunt
      et laboris ea laboris ipsum eu consectetur mollit nostrud sit cupidatat
    </p>
    <$$>{String.raw`\int_0^1 x^2 dx = \frac{1}{3}`}</$$>
    <p>
      veniam. Laboris velit ut ut eu proident Lorem qui. Aute sunt quis nostrud
      labore aute cupidatat mollit sint non esse consectetur ad. Adipisicing
      veniam et ea voluptate.
    </p>

    <p>
      Elit consequat eu cillum cupidatat aute aliqua culpa elit officia est nisi
      ex. Deserunt eu laborum in voluptate adipisicing ullamco. Culpa laborum
      incididunt nostrud labore.
    </p>

    <$$>{String.raw`
    \begin{cases}
    x + 2y = 3
    \\ 2x + y = 0
    \end{cases}
    `}</$$>
  </div>
);

export default Content;
