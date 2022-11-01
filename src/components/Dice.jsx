export default function Dice(props) {
  return (
    <div
      className={`
      ${props.isHeld ? "bg-accent" : "bg-white"}
        w-9 h-9 rounded shadow flex items-center justify-center text-primaryFont text-2xl cursor-pointer
        `}
      onClick={() => {
        props.holdDice(props.id);
      }}
    >
      <p>{props.value}</p>
    </div>
  );
}
