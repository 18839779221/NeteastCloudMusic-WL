import { Fragment } from "react";
import "./ListWrapper.css";

interface Props {
  title: string;
  itemList?: OptionItem[];
  moreLink: string;
  children?: React.ReactNode;
}

interface OptionItem {
  name: string;
  link: string;
}

export function ListWrapper(props: Props) {
  return (
    <div className="list-wrapper">
      <div className="list-wrapper-header">
        <div className="list-wrapper-header-title-deco"></div>
        <div className="list-wrapper-header-title">{props.title}</div>
        {props.itemList?.map((item, index) => (
          <Fragment key={index}>
            &nbsp;&nbsp;&nbsp;
            <a
              className="list-wrapper-header-item"
              href={item.link}
            >
              {item.name}
            </a>
            &nbsp;&nbsp;&nbsp;
            {index != (props.itemList?.length || 0) - 1 && <span>|</span>}
          </Fragment>
        ))}
        <a className="list-wrapper-header-more" href={props.moreLink}>更多</a>
      </div>
      <div className="list-wrapper-divider"></div>
      <div>{props.children}</div>
    </div>
  );
}
