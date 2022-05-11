const Card = (props) => {
  return (
    <div className="bg-white md:w-4/6 rounded-lg flex flex-col">
        <div>
        <img src={`${props?.data?.images?.jpg?.image_url}`} className="rounded-lg w-full h-80" alt="spinny" />  
        <p className="text-black text-center text-xl font-bold pt-6">{props?.data?.title}</p>
        </div>
    </div>
  );
};
export default Card;
