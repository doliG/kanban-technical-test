export interface Candidate {
  id: string;
  firstName: string;
  lastName: string;
  picture: string;
  job: string;
  location: string;
  linkedin: string;
  github: string;
  twitter: string;
  tags: Set<string>;
  stage: string;
}

export function toCandidate(apiCandidate): Candidate {
  return {
    ...apiCandidate,
    tags: new Set(apiCandidate.tags),
  };
}

export function candidateHaveTags(candidate: Candidate, tags: string[]) {
  for (const tag of tags) {
    if (candidate.tags.has(tag)) {
      return true;
    }
  }
  return false;
}

