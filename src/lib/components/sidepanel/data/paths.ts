import { PathShape } from "$lib/store";

const PATHS = [
  "M 32 0 L 64 56 L 0 56 L 32 0",
  "M 32 0 C 14.3269 0 0 14.3269 0 32 C 0 49.6731 14.3269 64 32 64 C 49.6731 64 64 49.6731 64 32 C 64 14.3269 49.6731 0 32 0",
  "M 32 0 L 35.1044 2.6258 L 38.6898 0.699276 L 41.1774 3.9096 L 45.0873 2.76655 L 46.8493 6.42107 L 50.9127 6.11146 L 51.8723 10.0505 L 55.9116 10.5878 L 56.0267 14.6392 L 59.8655 16 L 59.1311 19.9866 L 62.6014 22.1115 L 61.0497 25.8591 L 64 28.6551 L 61.6987 32 L 64 35.3449 L 61.0497 38.1409 L 62.6014 41.8885 L 59.1311 44.0134 L 59.8655 48 L 56.0267 49.3608 L 55.9116 53.4122 L 51.8723 53.9495 L 50.9127 57.8885 L 46.8493 57.5789 L 45.0873 61.2335 L 41.1774 60.0904 L 38.6898 63.3007 L 35.1044 61.3742 L 32 64 L 28.8956 61.3742 L 25.3102 63.3007 L 22.8226 60.0904 L 18.9127 61.2335 L 17.1507 57.5789 L 13.0873 57.8885 L 12.1277 53.9495 L 8.08838 53.4122 L 7.97326 49.3608 L 4.13454 48 L 4.8689 44.0134 L 1.39855 41.8885 L 2.9503 38.1409 L 0 35.3449 L 2.30131 32 L 0 28.6551 L 2.9503 25.8591 L 1.39855 22.1115 L 4.8689 19.9866 L 4.13454 16 L 7.97326 14.6392 L 8.08838 10.5878 L 12.1277 10.0505 L 13.0873 6.11146 L 17.1507 6.42107 L 18.9127 2.76655 L 22.8226 3.9096 L 25.3102 0.699276 L 28.8956 2.6258 L 32 0",
  "M 57.7466 0 L 6.25339 0 C 6.25339 3.44086 3.47078 6.25339 0 6.25339 L 0 57.7466 C 3.44086 57.7466 6.25339 60.5292 6.25339 64 L 57.7466 64 C 57.7466 60.5591 60.5292 57.7466 64 57.7466 L 64 6.25339 C 60.5591 6.25339 57.7466 3.47078 57.7466 0",
  "M 32 0 L 42.1823 21.8177 L 64 32 L 42.1823 42.1823 L 32 64 L 21.8177 42.1823 L 0 32 L 21.8177 21.8177 L 32 0",
  "M 32 0 L 39.5542 23.2999 L 64 23.2999 L 44.2229 37.7001 L 51.7771 61 L 32 46.5999 L 12.2229 61 L 19.7771 37.7001 L 0 23.2999 L 24.4458 23.2999 L 32 0",
  "M 28 0 L 39.3484 12.5456 L 56 16 L 50.6968 32 L 56 48 L 39.3484 51.4544 L 28 64 L 16.6516 51.4544 L 0 48 L 5.3032 32 L 0 16 L 16.6516 12.5456 L 28 0",
  "M 32 0 L 41.1844 9.82689 L 54.6274 9.37258 L 54.1731 22.8156 L 64 32 L 54.1731 41.1844 L 54.6274 54.6274 L 41.1844 54.1731 L 32 64 L 22.8156 54.1731 L 9.37258 54.6274 L 9.82689 41.1844 L 0 32 L 9.82689 22.8156 L 9.37258 9.37258 L 22.8156 9.82689 L 32 0",
  "M 64 32 L 32 0 L 32 16 L 0 16 L 0 48 L 32 48 L 32 64 L 64 32",
  "M 0 32 L 32 0 L 32 16 L 64 16 L 64 48 L 32 48 L 32 64 L 0 32",
  "M 32 0 L 0 64 L 64 64 L 32 0",
  "M 0 0 L 64 0 L 32 64 L 0 0",
  "M 0 0 L 64 0 L 64 64 L 0 64 L 0 32 L 64 32 L 0 32 L 0 0",
  "M 0 0 L 32 64 L 64 0 L 32 32 L 0 0", 
  "M 32 0 L 62.928 12.072 L 50.464 48.928 L 13.536 48.928 L 1.072 12.072 L 32 0", 
  "M 32 0 Q 48 12 64 16 Q 56 32 48 48 Q 64 64 32 64 Q 0 64 16 48 Q 8 32 0 16 Q 16 12 32 0", 
  "M 32 0 L 64 16 L 64 48 L 48 64 L 16 64 L 0 48 L 0 16 L 32 0",
  "M 0 32 Q 32 0 64 32 Q 32 64 0 32",
  "M 32 0 L 64 32 L 32 64 L 0 64 L 16 32 L 0 0 L 32 0",
  "M 0 0 L 64 0 L 32 32 L 64 64 L 0 64 L 32 32 L 0 0",
  "M 32 0 L 64 64 L 32 32 L 0 64 L 32 0",
  "M 0 0 Q 32 16 64 0 L 64 64 L 0 64 L 0 0",
  "M 0 0 L 64 0 L 64 32 L 48 32 L 48 64 L 16 64 L 16 32 L 0 32 L 0 0",
  "M 145.3512 0 C 148.1592 0 150.984 0 153.7864 0 C 176.1292 4.275736380952381 190.0924 18.50855619047619 196.4524 41.79785142857143 C 233.7016 38.69202285714285 260.784 82.72883809523809 244.2792 125.94895238095236 C 249.7676 135.03085714285714 254.3464 145.18979047619047 256 158.8248380952381 C 256 162.73066666666665 256 166.62735238095237 256 170.53257142857143 C 251.072 205.2352 229.8668 228.6848 195.0536 222.3719619047619 C 186.0964 240.1901714285714 170.158 258.03398095238094 145.3564 255.81165714285711 C 132.5368 254.64198095238095 123.6184 247.86651428571426 115.81 239.63489523809523 C 107.5856 246.4774095238095 98.6784 251.84731428571428 85.8088 251.9064380952381 C 56.0348 252.00761904761902 36.11716 225.6463238095238 35.63432 189.48754285714284 C 16.49356 181.0285714285714 3.52958 165.23885714285714 0 138.22049523809522 C 0 134.3152761904762 0 130.40152380952378 0 126.5127619047619 C 3.895856 99.73942857142856 16.15504 82.92205714285714 36.56668 75.79306666666666 C 35.3402 30.628754285714283 76.1692 2.4072045714285712 109.7112 22.30454857142857 C 117.6972 12.465310476190476 128.996 1.7338636190476189 145.3512 0"
]

export function createPathfromData(pathData: string): PathShape {
  return new PathShape({
      width: 64,
      height: 64,
      x: 0,
      y: 0,
      fill: "#efefef",
      path: pathData,
      stroke: "#1e293b",
      strokeWidth: 2,
      strokeDasharray: "",
      strokeLinecap: "round" as const,
      strokeType: "solid" as const,
      radius: 0,
      rotation: 0,
      opacity: 1,
  });
}

export const paths = PATHS.map(createPathfromData);