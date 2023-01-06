import ShoesCard from "../shoesCard/ShoesCard";

export const Favourite = (data) => {
  if (data?.length !== 0) {
    return data?.map((item, index) => {
      return (
        <div className="col-xl-4 col-md-6 col-12 mb-4" key={index}>
          <ShoesCard item={item} />
        </div>
      );
    });
  }
  return <p className="display-4 font-italic text-center">No favorite yet!</p>;
};
