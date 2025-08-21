export default function Header() {
  return (
    <div id="header">
      <img
        id="headshot"
        src="./portfolio/moi.jpg"
        alt="picture of me!"
        width="100%"
      />
      <div id="header-text">
        <h1 id="fullname">Nicolas Toon</h1>
        <div id="location">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="lucide lucide-map-pin-icon lucide-map-pin"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg> San Diego, California, USA
        </div>
      </div>
    </div>
  );
}
