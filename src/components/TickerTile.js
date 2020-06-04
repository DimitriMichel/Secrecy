import React from "react";
import { v4 as uuidv4 } from "uuid";
import "../App.css";
import numabbr from "numabbr";

const TickerTile = ({
  logo,
  symbol,
  exchange,
  companyName,
  latestPrice,
  volume,
  marketCap,
  priceEarningsRatio,
  openPrice,
}) => {
  return (
    <div className="ticker-tile-content">
      <div
        className="tile-header"
        style={{
          width: "100%",
          textAlign: "center",
          borderBottom: "1px #D7DCE0 solid",
          paddingBottom: 5,
        }}
      >
        <span
          style={
            latestPrice < openPrice
              ? {
                  verticalAlign: "middle",
                  fontSize: 30,
                  color: "#47B881",
                }
              : {
                  verticalAlign: "middle",
                  fontSize: 30,
                  color: "#EC4C47",
                }
          }
          className="tile-company-price"
        >
          ${latestPrice}
        </span>
        <div
          className="tile-company-name"
          style={{ fontFamily: "NeueHaasDisplay-Roman", marginTop: 2 }}
        >
          {companyName}  ({exchange})
        </div>
      </div>
      <div
        className="tile-info"
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "1fr 1fr",
          gridRowGap: 0,
          textAlign: "center",
        }}
      >
        <div
          style={{
            borderBottom: "1px white solid",
            backgroundColor: "#7B8B9A",
            color: "white",
          }}
        >
          Open
        </div>
        <div style={{ borderBottom: "1px #7B8B9A solid" }}>${openPrice}</div>
        <div
          style={{
            borderBottom: "1px white solid",
            backgroundColor: "#7B8B9A",
            color: "white",
          }}
        >
          Market Cap
        </div>
        <div style={{ borderBottom: "1px #7B8B9A solid" }}>
          {numabbr(marketCap)}
        </div>
        <div
          style={{
            backgroundColor: "#7B8B9A",
            color: "white",
            borderBottom: "1px white solid",
          }}
        >
          Volume
        </div>
        <div style={{ borderBottom: "1px #7B8B9A solid" }}>
          {numabbr(volume)}
        </div>
        <div
          style={{
            backgroundColor: "#7B8B9A",
            color: "white",
          }}
        >
          P/E Ratio
        </div>
        <div style={{ borderBottom: "1px #7B8B9A solid" }}>
          {priceEarningsRatio}
        </div>
      </div>
    </div>
  );
};

export default TickerTile;
