import { useState } from "react";
import { MdMenu } from "react-icons/md";
import { VscGithub } from "react-icons/vsc";

interface Props {
  onMenuSelection: (selected: string) => void;
}

export const Header: React.FC<Props> = ({ onMenuSelection }) => {
  return (
    <header className="navbar bg-primary text-primary-content">
      <div className="flex-none">
        <div className="dropdown">
          <button className="btn btn-square btn-ghost">
            <MdMenu size="2em" />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow bg-primary rounded-box w-52"
          >
            {["EMOTION100", "RECITATION324", "ROHAN4600"].map((corpus) => (
              <li key={corpus}>
                <a
                  onClick={() => {
                    (document.activeElement as HTMLElement).blur();
                    onMenuSelection(corpus);
                  }}
                >
                  {corpus}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">daihon</a>
      </div>
      <div className="flex-none">
        <button className="btn btn-square btn-ghost">
          <a href="https://github.com/darashi/daihon">
            <VscGithub size="2em" />
          </a>
        </button>
      </div>
    </header>
  );
};
