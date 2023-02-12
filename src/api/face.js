import * as faceapi from 'face-api.js';

const maxDescriptorDistance = 0.6;

export async function loadModels() {
  const MODEL_URL = process.env.PUBLIC_URL + '/models';
  await faceapi.loadTinyFaceDetectorModel(MODEL_URL);
  await faceapi.loadFaceLandmarkTinyModel(MODEL_URL);
  await faceapi.loadFaceRecognitionModel(MODEL_URL);
}

export async function getFullFaceDescription(blob, inputSize = 512) {
  // tiny_face_detector options
  let scoreThreshold = 0.6;
  const OPTION = new faceapi.TinyFaceDetectorOptions({
    inputSize,
    scoreThreshold
  });
  const useTinyModel = true;

  // fetch image to api
  let img = await faceapi.fetchImage(blob);

  // detect all faces and generate full description from image
  // including landmark and descriptor of each face
  let fullDiscription = await faceapi
    .detectAllFaces(img, OPTION)
    .withFaceLandmarks(useTinyModel)
    .withFaceDescriptors();
  return fullDiscription;
}

export async function createMatcher(faceProfile) {
  // Create labeled descriptors of people from profile
  let visitors = Object.keys(faceProfile); //picking objects from database
  let labeledDescriptors = visitors.map(
    visitor =>
      new faceapi.LabeledFaceDescriptors(
        faceProfile[visitor].rollno,
        faceProfile[visitor].descriptors.map(
          descriptor => new Float32Array(descriptor)
        )
      )
  );


  // Create face matcher (maximum descriptor distance is 0.6)
  let faceMatcher = new faceapi.FaceMatcher(
    labeledDescriptors,
    maxDescriptorDistance
  );
  return faceMatcher;
}

export function isFaceDetectionModelLoaded() {
  return !!faceapi.nets.tinyFaceDetector.params;
}
