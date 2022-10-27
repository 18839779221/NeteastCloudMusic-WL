import React from "react";
import { BannerModel, BannerResModel } from "../../../model/model";
import request from "../../../utils/request";
import "./Banner.css";

interface Props { }
interface State {
  bannerList: BannerModel[];
  currentIndex: number;
}

export class Banner extends React.Component<Props, State> {
  timerID?: NodeJS.Timer = undefined;
  constructor(props: any) {
    super(props);
    this.state = {
      bannerList: [],
      currentIndex: 0,
    };
    this.updateCurrentIndex = this.updateCurrentIndex.bind(this);
  }

  componentDidMount() {
    this.fetchData();
    this.setIntervalSwitchBanner();
  }

  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID);
    }
  }

  setIntervalSwitchBanner() {
    this.timerID = setInterval(
      () => this.updateCurrentIndex(this.state.currentIndex + 1),
      3000
    );
  }

  fetchData() {
    request({
      url: "/banner",
    }).then((res: BannerResModel) => {
      this.setState({
        bannerList: res.banners,
      });
    });
  }

  updateCurrentIndex(index: number) {
    index =
      (index + this.state.bannerList.length) % this.state.bannerList.length;
    this.setState({
      currentIndex: index,
    });
  }

  render() {
    return (
      <div
        className="banner"
        style={{
          background: `url(${this.state.bannerList[this.state.currentIndex]?.imageUrl || null
            }?imageView&blur=40x20) 6000px center`,
        }}
      >
        <div
          className="left-switch"
          onClick={() => this.updateCurrentIndex(this.state.currentIndex - 1)}
        ></div>
        <a className="banner-content" href={this.state.bannerList[this.state.currentIndex]?.url || "#"}
          style={{
            background: `url(${this.state.bannerList[this.state.currentIndex]?.imageUrl || null
              }?imageView&quality=89) center / contain no-repeat`,
          }}>
        </a>
        <div
          className="right-switch"
          onClick={() => this.updateCurrentIndex(this.state.currentIndex + 1)}
        ></div>
        <div
          className="banner-list"
          style={{
            backgroundImage: `url(${this.state.bannerList[this.state.currentIndex]?.imageUrl || null
              }) center center / cover no-repeat`,
          }}
        >
          {this.state.bannerList.map((banner, index) => (
            <div
              className={`banner-dot ${index === this.state.currentIndex ? "checked" : ""
                }`}
              key={index}
              onClick={() => this.updateCurrentIndex(index)}
            ></div>
          ))}
        </div>

      </div>
    );
  }
}
