import React from "react";

const PokemonThumbnails = ({
  id,
  name,
  image,
  iconImage,
  type,
  jpName,
  jpType,
}) => {
  const style = `thumb-container ${type}`;
  return (
    <div className={style}>
      <div className="number">
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <img src={iconImage} alt={name} className="icon-image" />
      <div className="detail-wrapper">
        <h3>{jpName}</h3>
        <h4>{jpType}</h4>
      </div>
    </div>
  );
};

export default PokemonThumbnails;
