const PhotoCard = ({ date, location }) => {
  return (
    <div className="flex flex-col px-4 py-2">
      <img src="" alt="" />
      <h4>{date}</h4>
      <h3>{location}</h3>
    </div>
  );
};

export default PhotoCard;
