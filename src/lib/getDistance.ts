type Loc = [number, number]

/**
 * This is the Haversine formula for calculating the distance between two lat/long pairs on a sphere (the earth)
 *
 * We use it to get distances between dog owners and sitters.
 * Each Loc is an array of coords in the form [longitude, latitude] - the geoJSON standard.
 * it returns the distance between them in KM.
 *
 * Adapted with thanks from https://github.com/chrisveness/geodesy - MIT License
 * @param location1
 * @param location2
 * @returns
 */

export function getDistance(location1: Loc, location2: Loc) {
  const R = 6371000; // radius of the earth, in m
  const φ1 = location1[1] * Math.PI / 180; // φ, λ in radians
  const φ2 = location2[1] * Math.PI / 180;
  const Δφ = (location2[1] - location1[1]) * Math.PI / 180;
  const Δλ = (location2[0] - location1[0]) * Math.PI / 180;

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) *
    Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.ceil((R * c) / 1000); // returns a distance in KM
}