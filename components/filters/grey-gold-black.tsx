"use client";

export const GreyGoldBlack = () => {
  return (
    <svg className="block !w-auto !h-0" aria-hidden="true">
      <filter
        id="grey-gold-black"
        x="-10%"
        y="-10%"
        width="120%"
        height="120%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        {/* Converte para escala de cinza */}
        {/* <feColorMatrix
        type="matrix"
        values="
            0.3 0.3 0.3 0 0
            0.3 0.3 0.3 0 0
            0.3 0.3 0.3 0 0
            0   0   0   1 0"
        in="SourceGraphic"
        result="colormatrix"
      /> */}

        <feColorMatrix
          type="matrix"
          result="grayscale"
          values="1 0 0 0 0
                                          1 0 0 0 0
                                          1 0 0 0 0
                                          0 0 0 1 0"
        />
        <feComponentTransfer in="colormatrix" result="componentTransfer">
          <feFuncR type="table" tableValues="0.9 0.7 0.5 0.3 0.1" />
          <feFuncG type="table" tableValues="0.88 0.65 0.45 0.28 0.1" />
          <feFuncB type="table" tableValues="0.75 0.55 0.35 0.2 0.1" />
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

// <feFuncR type="table" tableValues="0.9 0.7 0.5 0.3 0.1" />
//           <feFuncG type="table" tableValues="0.88 0.65 0.45 0.28 0.1" />
//           <feFuncB type="table" tableValues="0.75 0.55 0.35 0.2 0.1" />
