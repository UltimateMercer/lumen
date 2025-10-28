"use client";

export const BlackGoldUv = () => {
  return (
    <svg className="block !w-auto !h-0" aria-hidden="true">
      <filter
        id="black-gold-uv"
        x="-10%"
        y="-10%"
        width="120%"
        height="120%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        {/* Converte para escala de cinza */}
        <feColorMatrix
          type="matrix"
          values="
            0.3 0.3 0.3 0 0
            0.3 0.3 0.3 0 0
            0.3 0.3 0.3 0 0
            0   0   0   1 0"
          in="SourceGraphic"
          result="colormatrix"
        />
        <feComponentTransfer in="colormatrix" result="componentTransfer">
          <feFuncR type="table" tableValues="0.0706 0.4157 0.7804 0.9176" />
          <feFuncG type="table" tableValues="0.0706 0.302 0.6980 0.9176" />
          <feFuncB type="table" tableValues="0.0706 1 0.5412 0.9176" />

          <feFuncA type="table" tableValues="0 1" />
        </feComponentTransfer>
        <feBlend
          mode="normal"
          in="componentTransfer"
          in2="SourceGraphic"
          result="blend"
        />
      </filter>
    </svg>
  );
};
