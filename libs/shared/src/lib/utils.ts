const tipos: Record<string, string> = {
  image: 'fa-file-image-o',
  audio: 'fa-file-audio-o',
  video: 'fa-file-video-o',
  'application/pdf': 'fa-file-pdf-o',
  'application/msword': 'fa-file-word-o',
  'application/vnd.ms-word': 'fa-file-word-o',
  'application/vnd.oasis.opendocument.text': 'fa-file-word-o',
  'application/vnd.openxmlformats-officedocument.wordprocessingml':
    'fa-file-word-o',
  'application/vnd.ms-excel': 'fa-file-excel-o',
  'application/vnd.openxmlformats-officedocument.spreadsheetml':
    'fa-file-excel-o',
  'application/vnd.oasis.opendocument.spreadsheet': 'fa-file-excel-o',
  'application/vnd.ms-powerpoint': 'fa-file-powerpoint-o',
  'application/vnd.openxmlformats-officedocument.presentationml':
    'fa-file-powerpoint-o',
  'application/vnd.oasis.opendocument.presentation': 'fa-file-powerpoint-o',
  'text/plain': 'fa-file-text-o',
  'text/html': 'fa-file-code-o',
  'application/json': 'fa-file-code-o',
  'application/gzip': 'fa-file-archive-o',
  'application/zip': 'fa-file-archive-o',
};

export function classForMime(mime_type: string): string {
  const e = tipos[mime_type];
  const o = Object.keys(tipos).find((t) => mime_type.startsWith(t));
  if (o) return tipos[o];
  return e || 'fa-file';
}

export function formatBytes(bytes: number, decimals = 2) {
  if (!+bytes) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    'Bytes',
    'KiB',
    'MiB',
    'GiB',
    'TiB',
    'PiB',
    'EiB',
    'ZiB',
    'YiB',
  ];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}
