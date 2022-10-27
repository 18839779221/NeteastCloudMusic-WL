import './Copyright.css'

export function Copyright() {
  return (
    <div className="bottom">
      <div className="bottom-copyright">
        <p className="p1">
          <a href="#">服务条款</a>&nbsp;|&nbsp;
          <a href="#">隐私政策</a>&nbsp;|&nbsp;
          <a href="#">儿童隐私政策</a>&nbsp;|&nbsp;
          <a href="#">版权投诉</a>&nbsp;|&nbsp;
          <a href="#">投资者关系</a>&nbsp;|&nbsp;
          <a href="#">广告合作</a>&nbsp;|&nbsp;
          <a href="#">廉正举报</a>&nbsp;|&nbsp;
          <a href="#">联系我们</a>
        </p>
        <p className="p2">
          网易公司版权所有@1997-2022&nbsp;&nbsp;&nbsp;杭州乐读科技有限公司运营：
          <a href="#">浙网文[2021]&nbsp;1186-054号</a>
        </p>
        <p className="p2">
          <a href="#">
            粤B2-20090191-18&nbsp;&nbsp;工业和信息化部备案管理系统网站
          </a>
          &nbsp;&nbsp;
          <a href="#">
            <span className="policy-logo"></span>
            浙公网安备&nbsp;33010902002564号
          </a>
        </p>
      </div>
      <div className="bottom-right">
        {bottomIconList.map((item, index) => (
          <div className="right-logo" key={index}>
            <div className="logo-img" style={{ background: item.color }}></div>
            <div className="logo-desc">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

const bottomIconList = [
    {
        name: "Amped Studio",
        color: "#232323"
    },
    {
        name: "用户认证",
        color: "#454545"
    },
    {
        name: "独立音乐人",
        color: "#676767"
    },
    {
        name: "赞赏",
        color: "#898989"
    },
    {
        name: "视频奖励",
        color: "#ababab"
    },
]
