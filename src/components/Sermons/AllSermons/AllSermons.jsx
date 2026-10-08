import SermonBrowser from "../SermonBrowser";
import SermonHeader from "../SermonHeader";
export default function AllSermons() {
  return (
    <main>
      <SermonHeader archive />
      <SermonBrowser archive />
    </main>
  );
}
