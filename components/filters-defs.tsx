"use client";
import { BlackGoldGrey } from "./filters/black-gold-grey";
import { BlackGoldUv } from "./filters/black-gold-uv";
import { BlackRed } from "./filters/black-red";
import { BlklightBlueskyWhiteBlack } from "./filters/blklight-bluesky-white-black";
import { GreyGoldBlack } from "./filters/grey-gold-black";
export const FiltersDefs = () => {
  return (
    <>
      <BlackGoldGrey />
      <BlackGoldUv />
      <BlackRed />
      <GreyGoldBlack />
      <BlklightBlueskyWhiteBlack />
    </>
  );
};
