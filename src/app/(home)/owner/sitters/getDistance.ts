type Loc = {
  lat: number,
  long: number
}

export default function getDistance(location1:Loc, location2:Loc) {
  const R = 6371;
const φ1 = location1.lat * Math.PI/180; // φ, λ in radians
const φ2 = location2.lat * Math.PI/180;
const Δφ = (location2.lat-location1.lat) * Math.PI/180;
const Δλ = (location2.long-location1.long) * Math.PI/180;

const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

return R * c; // in metres
}