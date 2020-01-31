import React from "react";
import { $, $$ } from "../components/KatexComponents";
import Axes from "../components/Axes";
import Point from "../components/Point";
import ZeroSet from "../components/ZeroSet";
import LineSegment from "../components/LineSegment";

const Content = () => (
  <div>
    <h1>Linear Algebra</h1>
    <h3>What is Linear Algebra?</h3>
    <p>Linear algebra is the study of mathematical objects that you can add:</p>
    <$$>a+b</$$>
    <p>and that you can multiply by numbers</p>
    <$$>5a.</$$>
    <p>
      A vector space is a set where you can add elements of the set together and
      where you can multiply any element in the set by a number.
    </p>
    <p>
      For example, the set of pairs of numbers (things like <$>(-1, 0)</$> or{" "}
      <$>(5, 7)</$> or <$>(1.5, 2.5)</$> or <$>(3, 5)</$> etc) form a vector
      space:
    </p>
    <ul>
      <li>
        you can add any two of them together: <$>(-1, 0) + (5, 7) = (4, 7)</$>
      </li>
      <li>
        you can multiply any of them by a number:{" "}
        <$>0.5\cdot(3, 5) = (1.5, 2.5)</$>.
      </li>
    </ul>
    <p>
      For example, the set of triples of numbers (things like <$>(-1, 0, 0)</$>{" "}
      or <$>(3, 2, 1)</$> or <$>(-2.4, 1.6, 0)</$>) form a vector space:
    </p>
    <ul>
      <li>
        you can add any two of them together:{" "}
        <$>(-1, 0, 0) + (3, 2, 1) = (2, 2, 1)</$>
      </li>
      <li>
        you can multiply any of them by a number:{" "}
        <$>2\cdot(3, 2, 1) = (6, 4, 2)</$>
      </li>
    </ul>
    <p>
      Similarly for quadruples of numbers, quintuples of numbers, <$>n</$>
      -tuples of numbers.
    </p>
    <p>
      The set of pairs of numbers is called <$>\bbR^2</$>. The set of triples of
      numbers is called <$>\bbR^3</$>. The set of <$>n</$>-tuples of numbers is
      called <$>\bbR^n</$>. There are more vector spaces than these, but it is
      helpful to just focus on these vector spaces first.
    </p>
    <p>
      There are two other vector spaces not mentioned thus far, but that are
      important. First, the set of numbers themselves, <$>\bbR</$>, forms a
      vector space. And the set containing only zero, <$>{String.raw`\{0\}`}</$>, is a
      vector space.
    </p>
    <h2>Linear Systems of Equations</h2>
    <p>
      In practice, most problems in linear algebra reduce to solving systems of
      linear equations. This is a linear equation in two variables:
      <$$>x + 2y = 3</$$>
      It is linear because it can be written as a sum of numbers times the
      variables. There are no powers bigger than 1 ($x^2$) or funky functions
      ($\sin(x)$) lying around. If this definition seems unsatisfying and
      unintuitive, that's ok. We'll revisit it in the future.
    </p>
    <p>
      The set of solutions to the equation $x + 2y = 3$ is the set of pairs of
      numbers $(x, y)$ such that $x + 2y = 3$. For example, $(1, 1)$ is a
      solution, as is $(3, 0)$.
    </p>
    <p>The set of pairs of numbers can be plotted on the cartesian axis:</p>
    <Axes
      bounds={[
        [-5, 5],
        [-5, 5]
      ]}
    >
      <Point location={[1, 1]} />
      <Point location={[3, 0]} />
    </Axes>
    <p>
      Pictured above are two solutions to the equation $x + 2y = 3$. If you plot
      enough solutions, you see that they form a line:
    </p>
    <Axes
      bounds={[
        [-5, 5],
        [-5, 5]
      ]}
    >
      <Point location={[1, 1]} />
      <Point location={[3, 0]} />
      <Point location={[0, 1.5]} />
      <Point location={[-1, 2]} />
      <Point location={[2, 0.5]} />
      <Point location={[3, 0]} />
      <Point location={[4, -0.5]} />
      <ZeroSet f={(x, y) => x + 2 * y - 3} opacity={0.5} color={"blue"} />
    </Axes>
    <p>
      Therefore I might refer to "the line <$>x + 2y = 3</$>". This means the
      same thing as "the set of pairs of points <$>(x, y)</$> such that{" "}
      <$>x + 2y = 3</$>" and the same thing as "the set of solutions to{" "}
      <$>x + 2y = 3</$>".
    </p>
    <p>Here is a linear equation, in three variables:</p>
    <$$>x + 2y - z = 1.</$$>
    <p>
      The set of solutions of this equation is the set of triples of numbers{" "}
      <$>(x, y, z)</$> such that <$>x + 2y -z = 1</$>. For example,{" "}
      <$>(1, 1, 2)</$> is a solution, as is <$>(-1, 1.5, 1)</$>.
    </p>
    <p>
      The set of triples of numbers can be plotted on a 3-dimensional cartesian
      axis:
    </p>
    <Axes
      dim={3}
      bounds={[
        [-5, 5],
        [-5, 5],
        [-5, 5]
      ]}
    >
      <Point location={[1, 1, 2]} />
      <Point location={[-1, 1.5, 1]} />
    </Axes>
    <p>
      Above I have plotted two solutions to <$>x + 2y - z = 1</$>. If you plot
      lots of solutions, you can see that they form a plane:
    </p>
    <Axes
      dim={3}
      bounds={[
        [-5, 5],
        [-5, 5],
        [-5, 5]
      ]}
    >
      <Point location={[1, 1, 2]} />
      <Point location={[-1, 1.5, 1]} />
      <Point location={[2, 1, 3]} />
      <Point location={[2, -1, -1]} />
      <Point location={[0, 0.5, 0]} />
      <Point location={[0, 2.5, 4]} />
      <Point location={[-0.5, 0, -1.5]} />
      <Point location={[0, 0, -1]} />
      <ZeroSet
        f={(x, y, z) => x + 2 * y - z - 1}
        opacity={0.25}
        color={"blue"}
      />
    </Axes>
    <p>
      (How did I get these solutions? I fixed two of the coordinates and then
      determined the third. For example, for <$>(1, 1, 2)</$>, I said "suppose{" "}
      <$>x=1</$> and <$>y=1</$>, then <$>z</$> must be such that{" "}
      <$>1 + (2\cdot 1) - z = 1</$>, so <$>z</$> must be <$>1 + 2 - 1 = 2</$>".)
      Therefore, I might refer to "the plane <$>x + 2y - z = 1</$>", which is
      the same thing as "the set of pairs of points <$>(x, y)</$> such that{" "}
      <$>x + 2y - z = 1</$>" which is the same as "the set of solutions to{" "}
      <$>x + 2y - z = 1</$>".
    </p>
    <p>A system of linear equations is a set of linear equations, like</p>
    <$$>{String.raw`
      \begin{cases}
      x + 2y = 3
      \\ 2x + y = 0
      \end{cases}
      `}</$$>
    <p>
      The solutions to this system of equations are all the pairs of points <$>(x,
      y)</$> that satisfy both equations. For example <$>(-1, 2)</$> is a solution to
      this system of equations. In fact it's the only solution. You see, if <$>(x,
      y)</$> satisfies the first equation, then it lies on the line <$>x + 2y = 3</$>:
    </p>
    <Axes
      bounds={[
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet f={(x, y) => x + 2 * y - 3} opacity={0.5} color={"blue"} />
    </Axes>
    <p>
      and if it satisfies the second equation it lies on the line{" "}
      <$>2x + y = 0</$>:
    </p>
    <Axes
      bounds={[
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet f={(x, y) => 2 * x + y} opacity={0.5} color={"green"} />
    </Axes>
    <p>so if it satisfies both equations, then it lies on both lines:</p>
    <Axes
      bounds={[
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet f={(x, y) => x + 2 * y - 3} opacity={0.5} color={"blue"} />
      <ZeroSet f={(x, y) => 2 * x + y} opacity={0.5} color={"green"} />
    </Axes>
    <p>
      As you can, see <$>(-1, 2)</$> is the only point lying on both lines.
    </p>
    <p>
      Some systems of equations have no solutions. For example, when the two
      equations represent parallel lines:
    </p>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ width: "25%" }}>
            <$$>
              {String.raw`
              \begin{cases}x + 2y = 3\\ x + 2y = -1 \end{cases}
              `}
            </$$>
          </td>

          <td style={{ width: "75%" }}>
            <Axes
              bounds={[
                [-5, 5],
                [-5, 5]
              ]}
            >
              <ZeroSet
                f={(x, y) => x + 2 * y - 3}
                opacity={0.5}
                color={"blue"}
              />
              <ZeroSet
                f={(x, y) => x + 2 * y + 1}
                opacity={0.5}
                color={"green"}
              />
            </Axes>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Other systems of equation have infinitely many solutions. For example,
      when the two equations represent the same line:
    </p>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ width: "25%" }}>
            <$$>{String.raw`
              \begin{cases}
              x + 2y = 3\\
              2x + 4y = 6
              \end{cases}
              `}</$$>
          </td>

          <td style={{ width: "75%" }}>
            <Axes
              bounds={[
                [-5, 5],
                [-5, 5]
              ]}
            >
              <ZeroSet
                f={(x, y) => x + 2 * y - 3}
                opacity={0.5}
                color={"blue"}
              />
              <ZeroSet
                f={(x, y) => 2 * x + 4 * y - 6}
                opacity={0.5}
                color={"green"}
              />
            </Axes>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Another way a system of equations in two variables can have no solutions
      is if there are three equations but their lines do not all intersect in
      the same point. For example, the system
    </p>
    <$$>{String.raw`
      \begin{cases}
      x + 2y = 3\\
      2x + y = 0\\
      y = 1
      \end{cases}
      `}</$$>
    <p>
      has solutions given by the intersection of the three lines{" "}
      <$>x + 2y = 3</$>, <$>2x + y = 0</$>, and <$>y = 1</$>. But when you graph
      these lines, you see that no point lies on all three of them:
    </p>
    <Axes
      bounds={[
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet f={(x, y) => x + 2 * y - 3} opacity={0.5} color={"blue"} />
      <ZeroSet f={(x, y) => 2 * x + y} opacity={0.5} color={"green"} />
      <ZeroSet f={(x, y) => y - 1} opacity={0.5} color={"purple"} />
    </Axes>
    <p>so this system has no solutions.</p>
    <p>You can have systems of equations of three variables, for example</p>
    <$$>{String.raw`
      \begin{cases}
      x + 2y - z = 1 \\
      2x + z = -1
      \end{cases}
      `}</$$>
    <p>
      The solutions to this system of equations are the triples <$>(x, y, z)</$>{" "}
      that satisfy both equations. If a triple satisfies the first equation, it
      lies on the plane <$>x + 2y - z = 1</$>. If it satisfies the second
      equation, it lies on the plane <$>2x + z = -1</$>. If it satisfies both
      equations, it must lie on the intersection of the two planes:
    </p>
    <Axes
      dim={3}
      bounds={[
        [-5, 5],
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet
        f={(x, y, z) => x + 2 * y - z - 1}
        opacity={0.25}
        color={"blue"}
      />
      <ZeroSet f={(x, y, z) => 2 * x + z + 1} opacity={0.25} color={"green"} />
    </Axes>
    <p>
      As you can see, the intersection of the two planes is a line, so the
      solutions to the system form a line. For example, here two solutions are{" "}
      <$>(1, -1.5, -3)</$> and <$>(0, 0, -1)</$>, and you can see that they lie
      on the line of intersection:
    </p>
    <Axes
      dim={3}
      bounds={[
        [-5, 5],
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet
        f={(x, y, z) => x + 2 * y - z - 1}
        opacity={0.25}
        color={"blue"}
      />
      <ZeroSet f={(x, y, z) => 2 * x + z + 1} opacity={0.25} color={"green"} />
      <Point location={[1, -1.5, -3]} />
      <Point location={[0, 0, -1]} />
      <LineSegment start={[2, -3, -5]} end={[-3, 4.5, 5]} color={"orange"} />
    </Axes>
    <p>
      There are, of course, infinitely many solutions to the system since there
      are infinitely many points on the line.
    </p>
    <p>Here is a system of three linear equations in three variables:</p>
    <$$>{String.raw`
      \begin{cases}
      x + 2y - z = 1 \\
      2x + z = -1\\
      -3x -2y + 2z = 2
      \end{cases}
      `}</$$>
    <p>
      The solutions to each equation correspond to a plane. Therefore the points{" "}
      <$>(x, y, z)</$> that satisfy all three equations are the points in the
      intersection of these three planes. As you can see, there is just a single
      point that lies in all three planes:
    </p>
    <Axes
      dim={3}
      bounds={[
        [-5, 5],
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet
        f={(x, y, z) => x + 2 * y - z - 1}
        opacity={0.25}
        color={"blue"}
      />
      <ZeroSet f={(x, y, z) => 2 * x + z + 1} opacity={0.25} color={"green"} />
      <ZeroSet
        f={(x, y, z) => -3 * x - 2 * y + 2 * z - 2}
        opacity={0.25}
        color={"purple"}
      />
    </Axes>
    <p>It turns out that this solution is <$>(-1, 1.5, 1)</$>:</p>
    <Axes
      dim={3}
      bounds={[
        [-5, 5],
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet
        f={(x, y, z) => x + 2 * y - z - 1}
        opacity={0.25}
        color={"blue"}
      />
      <ZeroSet f={(x, y, z) => 2 * x + z + 1} opacity={0.25} color={"green"} />
      <ZeroSet
        f={(x, y, z) => -3 * x - 2 * y + 2 * z - 2}
        opacity={0.25}
        color={"purple"}
      />
      <Point location={[-1, 3 / 2, 1]} />
    </Axes>
    <p>
      Most of the time, a system of three linear equations in three variables
      has a single solution. Sometimes, however, all three planes could
      intersect in the same line, in which case there are a line's worth of
      solutions. For example, in the system
    </p>
    <$$>{String.raw`
      \begin{cases}
      x + 2y - z = 1\\
      2x + z = -1\\
      3x + 2y = 0
      \end{cases}
      `}</$$>
    <p>all three planes intersect in the orange line pictured:</p>
    <Axes
      dim={3}
      bounds={[
        [-5, 5],
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet
        f={(x, y, z) => x + 2 * y - z - 1}
        opacity={0.25}
        color={"blue"}
      />
      <ZeroSet f={(x, y, z) => 2 * x + z + 1} opacity={0.25} color={"green"} />
      <ZeroSet f={(x, y, z) => 3 * x + 2 * y} opacity={0.25} color={"purple"} />
      <LineSegment start={[2, -3, -5]} end={[-3, 4.5, 5]} color={"orange"} />
    </Axes>
    <p>
      You can have systems of linear equations in three variables that have no
      solutions. For example, you can have two parallel planes, as in this
      system:
    </p>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ width: "25%" }}>
            <$$>{String.raw`
              \begin{cases}
              x + 2y - z = 1\\
              -x -2y + z = 1
              \end{cases}
              `}</$$>
          </td>

          <td style={{ width: "75%" }}>
            <Axes
              dim={3}
              bounds={[
                [-5, 5],
                [-5, 5],
                [-5, 5]
              ]}
            >
              <ZeroSet
                f={(x, y, z) => x + 2 * y - z - 1}
                opacity={0.25}
                color={"blue"}
              />
              <ZeroSet
                f={(x, y, z) => x + 2 * y - z + 1}
                opacity={0.25}
                color={"green"}
              />
            </Axes>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      or you can have three equations, two of which represent parallel planes, as in
      this system:
    </p>
    <table style={{ width: "100%" }}>
      <tbody>
        <tr>
          <td style={{ width: "25%" }}>
            <$$>{String.raw`
              \begin{cases}
              x + 2y - z = 1\\
              -x -2y + z = 1\\
              -3x -2y + 2z = 2
              \end{cases}
              `}</$$>
          </td>

          <td style={{ width: "75%" }}>
            <Axes
              dim={3}
              bounds={[
                [-5, 5],
                [-5, 5],
                [-5, 5]
              ]}
            >
              <ZeroSet
                f={(x, y, z) => x + 2 * y - z - 1}
                opacity={0.25}
                color={"blue"}
              />
              <ZeroSet
                f={(x, y, z) => x + 2 * y - z + 1}
                opacity={0.25}
                color={"green"}
              />
              <ZeroSet
                f={(x, y, z) => -3 * x - 2 * y + 2 * z - 2}
                opacity={0.25}
                color={"purple"}
              />
            </Axes>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      Lastly, consider the following system of four equations in three
      variables:
    </p>
    <$$>{String.raw`
      \begin{cases}
      x = 0 \\
      y = 0 \\
      z = 0 \\
      x + y + z = 3
      \end{cases}
      `}</$$>
    <p>
      Here any three of the planes have a single commont point, but no point
      lies in all four, so the system has no solutions:
    </p>
    <Axes
      dim={3}
      bounds={[
        [-5, 5],
        [-5, 5],
        [-5, 5]
      ]}
    >
      <ZeroSet f={(x, y, z) => x} opacity={0.25} color={"blue"} />
      <ZeroSet f={(x, y, z) => y} opacity={0.25} color={"green"} />
      <ZeroSet f={(x, y, z) => z} opacity={0.25} color={"purple"} />
      <ZeroSet f={(x, y, z) => x + y + z - 3} opacity={0.25} color={"pink"} />
    </Axes>
    <p>
      There are other configurations, possible, of course (three equations that
      each represent the same plane so that the system has a plane's worth of
      solutions; or four equations that represent planes that have a single
      common point of intersection; etc), but this is enough for now.
    </p>
    <h2>Solving Systems of Linear Equations</h2>
    <p>What are the solutions to the system of equations?</p>
    <$$>{String.raw`
      \begin{cases}
      x + 2y = 3\\
      2x + y = 0
      \end{cases}
      `}</$$>
    <p>
      There are many ways of answering this question, and here is one. It hinges
      on two observations:
    </p>
    <ol>
      <li>
        If <$>(x, y)</$> satisfies <$>x + 2y = 3</$>, then they must also
        satisfy <$>2x + 4y = 6</$>. That is, I can multiply an equation by a
        nonzero constant and the system's solutions don't change.
      </li>

      <li>
        If <$>(x, y)</$> satisfies <$>x + 2y = 3</$> and <$>2x + y = 0</$>, then{" "}
        <$>(x, y)</$> also satisfies the sum of these two equations,{" "}
        <$>3x + 3y = 3</$>, because if <$>x + 2y = 3</$> and <$>2x + y = 0</$>{" "}
        then <$>(x + 2y) + (2x + y) = 3 + 0 = 3</$>. Combining this with the
        prior observation: I can add a multiple of one equation to another and
        the system's solutions don't change.
      </li>

      <p>
        There is a third observation that you or may not want to use in solving
        the system:
      </p>

      <li>
        If you switch two of the equations, the system's solutions don't change.
        That is, the solutions to the system
      </li>
    </ol>
    <$$>{String.raw`
      \begin{cases}
      x + 2y = 3\\
      2x + y = 0
      \end{cases}
      `}</$$>
    <p>and the system</p>
    <$$>{String.raw`
      \begin{cases}
      2x + y = 0\\
      x + 2y = 3
      \end{cases}
      `}</$$>
    <p>are the same.</p>
    <p>Using the observations, proceed:</p>
    <$$>{String.raw`
      \begin{cases}
      x + 2y = 3\\
      2x + y = 0
      \end{cases}
      `}</$$>
    <p>
      add <$>-2</$> times the second equation to the first
    </p>
    <$$>{String.raw`
      \begin{cases}
      -3x = 3\\
      2x + y = 0
      \end{cases}
      `}</$$>
    <p>
      multiply the first equation by <$>-1/3</$>:
    </p>
    <$$>{String.raw`
      \begin{cases}
      x = -1\\
      2x + y = 0
      \end{cases}
      `}</$$>
    <p>
      add <$>-2</$> times the first equation to the second
    </p>
    <$$>{String.raw`
      \begin{cases}
      x = -1\\
      y = 2
      \end{cases}
      `}</$$>
    <p>
      At every step of the way, the system of equations changed, but the
      solution did not. You can see this clearly when I graph the solutions to
      each equation as lines:
    </p>
    <table style={{ width: "100%" }}>
      <tr>
        <th style={{ width: "25%" }}>System</th>
        <th style={{ width: "75%" }}>Graph of solutions to system equations</th>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x + 2y = 3\\
            2x + y = 0
            \end{cases}
            `}</$$>
        </td>

        <td style={{ width: "75%" }}>
          <Axes
            bounds={[
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y) => x + 2 * y - 3} opacity={0.5} color={"blue"} />
            <ZeroSet f={(x, y) => 2 * x + y} opacity={0.5} color={"green"} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            -3x = 3\\
            2x + y = 0
            \end{cases}
            `}</$$>
        </td>

        <td style={{ width: "75%" }}>
          <Axes
            bounds={[
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y) => -3 * x - 3} opacity={0.5} color={"blue"} />
            <ZeroSet f={(x, y) => 2 * x + y} opacity={0.5} color={"green"} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x = -1\\
            2x + y = 0
            \end{cases}
            `}</$$>
        </td>

        <td style={{ width: "75%" }}>
          <Axes
            bounds={[
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y) => x + 1} opacity={0.5} color={"blue"} />
            <ZeroSet f={(x, y) => 2 * x + y} opacity={0.5} color={"green"} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x = -1\\
            y = 2
            \end{cases}
            `}</$$>
        </td>

        <td style={{ width: "75%" }}>
          <Axes
            bounds={[
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y) => x + 1} opacity={0.5} color={"blue"} />
            <ZeroSet f={(x, y) => y - 2} opacity={0.5} color={"green"} />
          </Axes>
        </td>
      </tr>
    </table>
    <p>
      The steps here are determined by a strategy to reduce each equation to
      have a single variable. Knowing which steps to take comes with practice.
    </p>
    <p>
      The example presented here is a system of two equations in two variables.
      For systems with more variables, it helps to organize the system of
      equations into little boxes called "augmented matrices", best described by
      example:
    </p>
    <table style={{ width: "100%" }}>
      <tr>
        <th>System</th>
        <th>Augmented matrix</th>
      </tr>

      <tr>
        <td>
          <$$>{String.raw`
            \begin{cases}
            x + 2y = 3\\
            2x + y = 0
            \end{cases}
            `}</$$>
        </td>
        <td>
          <$$>{String.raw`
            \baug{cc|c}
            1 & 2 & 3\\
            2 & 1 & 0
            \eaug
            `}</$$>
        </td>
      </tr>

      <tr>
        <td>
          <$$>{String.raw`
            \begin{cases}
            x + 2y - z = 1 \\
            2x + z = -1\\
            -3x -2y + 2z = 2
            \end{cases}
            `}</$$>
        </td>
        <td>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            2 & 0 & 1 & -1\\
            -3 & -2 & 2 & 2
            \eaug
            `}</$$>
        </td>
      </tr>

      <tr>
        <td>
          <$$>{String.raw`
            \begin{cases}
            x_1 + 2x_2 + x_5 = 3\\
            x_2 + x_3 + x_4 + x_5 = 0
            \end{cases}
            `}</$$>
        </td>
        <td>
          <$$>{String.raw`
            \baug{ccccc|c}
            1 & 2 & 0 & 0 & 1 & 3\\
            0 & 1 & 1 & 1 & 1 & 0
            \eaug
            `}</$$>
        </td>
      </tr>
    </table>
    <p>
      The three operations that change a system without changing its solutions
      can rewritten in terms of rows:
    </p>
    <ol>
      <li>Multiply a row by a nonzero constant</li>
      <li>Add a multiple of one row to another</li>
      <li>Swap two rows</li>
    </ol>
    <p>It is worthwhile going through solving the system</p>
    <$$>{String.raw`
      \begin{cases}
      x + 2y = 3\\
      2x + y = 0
      \end{cases}
      `}</$$>
    <p>using the augmented matrix notation:</p>
    <table style={{ width: "100%" }}>
      <tr>
        <th style={{ width: "25%" }}>System</th>
        <th style={{ width: "25%" }}>Augmented Matrix</th>
        <th style={{ width: "50%" }}>Graph of solutions to system equations</th>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x + 2y = 3\\
            2x + y = 0
            \end{cases}
            `}</$$>
        </td>

        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{cc|c}
            1 & 2 & 3\\
            2 & 1 & 0
            \eaug
            `}</$$>
        </td>

        <td style={{ width: "50%" }}>
          <Axes
            bounds={[
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y) => x + 2 * y - 3} opacity={0.5} color={"blue"} />
            <ZeroSet f={(x, y) => 2 * x + y} opacity={0.5} color={"green"} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={3} style={{ textAlign: "center" }}>
          Add <$>-2</$> times the second row to the first row to eliminate <$>y</$> from
          the first row
        </td>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            -3x = 3\\
            2x + y = 0
            \end{cases}
            `}</$$>
        </td>
        <td>
          <$$>{String.raw`
            \baug{cc|c}
            -3 & 0 & 3\\
            2 & 1 & 0
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            bounds={[
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y) => -3 * x - 3} opacity={0.5} color={"blue"} />
            <ZeroSet f={(x, y) => 2 * x + y} opacity={0.5} color={"green"} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={3} style={{ textAlign: "center" }}>
          Multiply the first row by <$>-1/3</$> to solve for <$>y</$>
        </td>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x = -1\\
            2x + y = 0
            \end{cases}
            `}</$$>
        </td>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{cc|c}
            1  & 0 & -1\\
            2 & 1 & 0
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            bounds={[
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y) => x + 1} opacity={0.5} color={"blue"} />
            <ZeroSet f={(x, y) => 2 * x + y} opacity={0.5} color={"green"} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={3} style={{ textAlign: "center" }}>
          Add <$>-2</$> times the first row to the second row to eliminate{" "}
          <$>x</$> from the second row
        </td>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x = -1\\
            y = 2
            \end{cases}
            `}</$$>
        </td>
        <td>
          <$$>{String.raw`
            \baug{cc|c}
            1  & 0 & -1\\
            0 & 1 & 2
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            bounds={[
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y) => x + 1} opacity={0.5} color={"blue"} />
            <ZeroSet f={(x, y) => y - 2} opacity={0.5} color={"green"} />
          </Axes>
        </td>
      </tr>
    </table>
    <p>
      It's worth going over an example of a system of three equations in three
      variables:
    </p>
    <$$>
      {String.raw`
      \begin{cases}
      x + 2y - z = 1 \\
      2x + z = -1\\
      -3x -2y + 2z = 2
      \end{cases}
      `}
    </$$>
    <p>
      As with the system of two equations and two variables, solve this by using
      the three row operations to eliminate variables from the equations until
      there's just a single variable in each equation:
    </p>
    <table style={{ width: "100%" }}>
      <tr>
        <th style={{ width: "25%" }}>System</th>
        <th style={{ width: "25%" }}>Augmented Matrix</th>
        <th style={{ width: "50%" }}>Graph of equations in system</th>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x + 2y - z = 1 \\
            2x + z = -1\\
            -3x -2y + 2z = 2
            \end{cases}
            `}</$$>
        </td>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            2 & 0 & 1 & -1\\
            -3 & -2 & 2 & 2
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 2 * y - z - 1}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet
              f={(x, y, z) => 2 * x + z + 1}
              opacity={0.25}
              color={"green"}
            />
            <ZeroSet
              f={(x, y, z) => -3 * x - 2 * y + 2 * z - 2}
              opacity={0.25}
              color={"purple"}
            />
            <Point location={[-1, 1.5, 1]} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={2} style={{ textAlign: "center" }}>
          add the first row to the third row to eliminate $y$ from the third row
        </td>
      </tr>

      <tr>
        <td style={{ width: "25%" }}>
          <$$>
            {String.raw`
            \begin{cases}
            x + 2y - z = 1 \\
            2x + z = -1\\
            -2x + z = 3
            \end{cases}
            `}
          </$$>
        </td>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            2 & 0 & 1 & -1\\
            -2 & 0 & 1 & 3
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 2 * y - z - 1}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet
              f={(x, y, z) => 2 * x + z + 1}
              opacity={0.25}
              color={"green"}
            />
            <ZeroSet
              f={(x, y, z) => -2 * x + z - 3}
              opacity={0.25}
              color={"purple"}
            />
            <Point location={[-1, 3 / 2, 1]} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={3} style={{ textAlign: "center" }}>
          add the second row to the third row to eliminate $x$ from the third
          row
        </td>
      </tr>
      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x + 2y - z = 1 \\
            2x + z = -1\\
            2z = 2
            \end{cases}
            `}</$$>
        </td>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            2 & 0 & 1 & -1\\
            0 & 0 & 2 & 2
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 2 * y - z - 1}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet
              f={(x, y, z) => 2 * x + z + 1}
              opacity={0.25}
              color={"green"}
            />
            <ZeroSet
              f={(x, y, z) => 2 * z - 2}
              opacity={0.25}
              color={"purple"}
            />
            <Point location={[-1, 3 / 2, 1]} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={3} style={{ textAlign: "center" }}>
          multiply the third row by <$>1/2</$> to solve for <$>z</$> in the last
          row
        </td>
      </tr>
      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x + 2y - z = 1 \\
            2x + z = -1\\
            z = 1
            \end{cases}
            `}</$$>
        </td>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            2 & 0 & 1 & -1\\
            0 & 0 & 1 & 1
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 2 * y - z - 1}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet
              f={(x, y, z) => 2 * x + z + 1}
              opacity={0.25}
              color={"green"}
            />
            <ZeroSet f={(x, y, z) => z - 1} opacity={0.25} color={"purple"} />
            <Point location={[-1, 3 / 2, 1]} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={3} style={{ textAlign: "center" }}>
          add <$>-1</$> times the third row to the second row in order to
          eliminate <$>z</$> from the second row
        </td>
      </tr>
      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x + 2y - z = 1 \\
            2x = -2\\
            z = 1
            \end{cases}
            `}</$$>
        </td>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            2 & 0 & 0 & -2\\
            0 & 0 & 1 & 1
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 2 * y - z - 1}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet
              f={(x, y, z) => 2 * x + 2}
              opacity={0.25}
              color={"green"}
            />
            <ZeroSet f={(x, y, z) => z - 1} opacity={0.25} color={"purple"} />
            <Point location={[-1, 3 / 2, 1]} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={3} style={{ textAlign: "center" }}>
          multiply the second row by <$>1/2</$> to solve for <$>x</$>
        </td>
      </tr>
      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            x + 2y - z = 1 \\
            x = -1\\
            z = 1
            \end{cases}
            `}</$$>
        </td>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            1 & 0 & 0 & -1\\
            0 & 0 & 0 & 1
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 2 * y - z - 1}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet f={(x, y, z) => x + 1} opacity={0.25} color={"green"} />
            <ZeroSet f={(x, y, z) => z - 1} opacity={0.25} color={"purple"} />
            <Point location={[-1, 3 / 2, 1]} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={3} style={{ textAlign: "center" }}>
          add the third row to the first (to eliminate <$>z</$> from the first
          row) and add <$>-1</$> times the second row to the first row (to
          eliminate <$>x</$> from the first row)
        </td>
      </tr>
      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            2y = 3 \\
            x = -1\\
            z = 1
            \end{cases}
            `}</$$>
        </td>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{ccc|c}
            0 & 2 & 0 & 3\\
            1 & 0 & 0 & -1\\
            0 & 0 & 1 & 1
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y, z) => 2 * y - 3} opacity={0.25} color={"blue"} />
            <ZeroSet f={(x, y, z) => x + 1} opacity={0.25} color={"green"} />
            <ZeroSet f={(x, y, z) => z - 1} opacity={0.25} color={"purple"} />
            <Point location={[-1, 3 / 2, 1]} />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={3} style={{ textAlign: "center" }}>
          multiply the first row by <$>1/2</$> to solve for <$>y</$>
        </td>
      </tr>
      <tr>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \begin{cases}
            y = 3/2\\
            x = -1\\
            z = 1
            \end{cases}
            `}</$$>
        </td>
        <td style={{ width: "25%" }}>
          <$$>{String.raw`
            \baug{ccc|c}
            0 & 1 & 0 & 3/2\\
            1 & 0 & 0 & -1\\
            0 & 0 & 1 & 1
            \eaug
            `}</$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet f={(x, y, z) => y - 1.5} opacity={0.25} color={"blue"} />
            <ZeroSet f={(x, y, z) => x + 1} opacity={0.25} color={"green"} />
            <ZeroSet f={(x, y, z) => z - 1} opacity={0.25} color={"purple"} />
            <Point location={[-1, 1.5, 1]} />
          </Axes>
        </td>
      </tr>
    </table>
    <p>
      At this point the system has been simplified enough that we can read off
      its only solution: <$>(-1, 1.5, 1)</$>.
    </p>
    <p>
      In both of the previous examples, the augmented matrix was transformed to
      a simpler form by the three row operations:
    </p>
    <$$>
      {String.raw`
      \baug{cc|c}
      1 & 2 & 3\\
      2 & 1 & 0
      \eaug

      \to 

      \baug{cc|c}
      1  & 0 & -1\\
      0 & 1 & 2
      \eaug
    `}</$$>
        <$$>{String.raw`
      \baug{ccc|c}
      1 & 2 & -1 & 1\\
      2 & 0 & 1 & -1\\
      -3 & -2 & 2 & 2
      \eaug

      \to

      \baug{ccc|c}
      0 & 1 & 0 & 3/2\\
      1 & 0 & 0 & -1\\
      0 & 0 & 1 & 1
      \eaug
      `}
    </$$>
    <p>
      The benefit of this work is that, in the simpler form, the solution to the
      system is immediately clear.
    </p>
    <h2>Row Reduction</h2>
    <p>
      Mathematicians have come up with a "simplest form" of an augmented matrix
      called "reduced row echelon form". An augmented matrix is in reduced row
      echelon form (rref) if
    </p>
    <ol>
      <li>
        For each row, the first column left of the vertical line with a nonzero
        entry in that row is a column of all zeros except for a 1 in that row.
        These columns are called pivot columns.
      </li>
      <li>
        The pivot columns are ordered by their nonzero rows. That is, the pivot
        column for row <$>i</$> must precede the pivot colum for row <$>j</$> if{" "}
        <$>{String.raw`i < `}j</$>.
      </li>
      <li>
        If there are <$>k</$> pivot columns, then they must be the pivot columns
        for rows <$>1,\ldots, k</$>.
      </li>
    </ol>
    <p>Here are some examples:</p>
    <table>
      <tr>
        <th>Augmented Matrix</th>
        <th>rref?</th>
        <th>Comment</th>
      </tr>

      <tr>
        <td>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            2 & 0 & 1 & -1
            \eaug
            `}</$$>
        </td>
        <td>not rref</td>
        <td>No pivot columns.</td>
      </tr>

      <tr>
        <td>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 0 & 1 & 0\\
            0 & 1 & 2 & 1
            \eaug
            `}</$$>
        </td>
        <td>rref</td>
        <td>First two columns are pivot columns.</td>
      </tr>

      <tr>
        <td>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 1 & 0 & -1\\
            0 & 0 & 1 & -1
            \eaug
            `}</$$>
        </td>
        <td>rref</td>
        <td>First and third columns are pivot columns.</td>
      </tr>

      <tr>
        <td>
          <$$>{String.raw`
            \baug{ccc|c}
            1 & 2 & 3 & -1\\
            0 & 0 & 0 & -1
            \eaug
            `}</$$>
        </td>
        <td>rref</td>
        <td>
          First column is the only pivot column; there is no pivot column for
          the second row.
        </td>
      </tr>

      <tr>
        <td>
          <$$>{String.raw`
            \baug{ccc|c}
            0 & 1 & 3 & 2\\
            0 & 0 & 1 & -1
            \eaug
            `}</$$>
        </td>
        <td>not rref</td>
        <td>
          The second column is a pivot column for the first row, but the first
          nonzero entry in the second row comes in the third column, and the
          third column is not a column with just a single 1.
        </td>
      </tr>

      <tr>
        <td>
          <$$>{String.raw`
            \baug{ccc|c}
            0 & 1 & 0 & 0\\
            1 & 0 & 1 & 0
            \eaug
            `}</$$>
        </td>
        <td>not rref</td>
        <td>
          The first and second columns are pivot columns for the second and
          first row, but they come in the wrong order: the pivot column for the
          first column needs to come before the pivot column for the second
          column.
        </td>
      </tr>

      <tr>
        <td>
          <$$>
            {String.raw`
            \baug{ccc|c}
            1 & 0 & 0 & 0\\
            0 & 0 & 0 & 2\\
            0 & 0 & 1 & -3
            \eaug
            `}
          </$$>
        </td>
        <td>not rref</td>
        <td>
          The first and third columns are pivot columns for the first and third
          rows. Since there are two pivot columns, according to the last part of
          the definition of rref, there should be pivot columns for rows 1 and
          2. This is not the case, so the augmented matrix is not in rref.
        </td>
      </tr>
    </table>
    The definition of reduced row echelon form is a human construction of
    convenience, rather than some central concept foisted on us by the abstract
    laws of math, but it turns out to be useful. One of the most important facts
    is that every augmented matrix can be transformed by row operations to a
    unique rref augmented matrix. To "row-reduce" a matrix means to repeatedly
    apply the three row-operations to transform it into a matrix in reduced row
    echelon form. For example:
    <table>
      <tr>
        <td style={{ width: "50%" }}>
          <$$>
            {String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            2 & 0 & 1 & -1
            \eaug
            `}
          </$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 2 * y - z - 1}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet
              f={(x, y, z) => 2 * x + z + 1}
              opacity={0.25}
              color={"green"}
            />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={2} style={{ textAlign: "center" }}>
          add <$>-2</$> times row <$>1</$> to row <$>2</$> in order to turn the
          first column into a pivot column
        </td>
      </tr>

      <tr>
        <td style={{ width: "50%" }}>
          <$$>
            {String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            0 & -4 & 3 & -3
            \eaug
            `}
          </$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 2 * y - z - 1}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet
              f={(x, y, z) => -4 * y + 3 * z + 3}
              opacity={0.25}
              color={"green"}
            />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={2} style={{ textAlign: "center" }}>
          multiply the second row by $-1/4$ to start to turn the second column
          into a pivot column
        </td>
      </tr>

      <tr>
        <td style={{ width: "50%" }}>
          <$$>
            {String.raw`
            \baug{ccc|c}
            1 & 2 & -1 & 1\\
            0 & 1 & -3/4 & 3/4
            \eaug
            `}
          </$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 2 * y - z - 1}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet
              f={(x, y, z) => y - 0.75 * z - 0.75}
              opacity={0.25}
              color={"green"}
            />
          </Axes>
        </td>
      </tr>

      <tr>
        <td colSpan={2} style={{ textAlign: "center" }}>
          add <$>-2</$> times the second row to the first to finish turning the
          second column into a pivot column
        </td>
      </tr>

      <tr>
        <td style={{ width: "50%" }}>
          <$$>
            {String.raw`
            \baug{ccc|c}
            1 & 0 & 1/2 & -1/2\\
            0 & 1 & -3/4 & 3/4
            \eaug
            `}
          </$$>
        </td>
        <td style={{ width: "50%" }}>
          <Axes
            dim={3}
            bounds={[
              [-5, 5],
              [-5, 5],
              [-5, 5]
            ]}
          >
            <ZeroSet
              f={(x, y, z) => x + 0.5 * z + 0.5}
              opacity={0.25}
              color={"blue"}
            />
            <ZeroSet
              f={(x, y, z) => y - 0.75 * z - 0.75}
              opacity={0.25}
              color={"green"}
            />
          </Axes>
        </td>
      </tr>
    </table>
    <p>
      Because the row operations do not change the solution to the augmented
      matrix, the row-reduced augmented matrix has the same solution set as the
      original augmented matrix. You can see this in the previous example where,
      at every stage, each pair of planes intersects in the same line.
    </p>
  </div>
);

export default Content;
