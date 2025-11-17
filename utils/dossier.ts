// Type Definitions

interface ClassifiedField<T> {
  value: T;
  classified: boolean;
}

interface DateFormat {
  day: number;
  season: "Solaris" | "Auren" | "Umbrae" | "Vernis";
  year: number;
  hemisphere: "N" | "S";
}

interface BirthInfo {
  date: ClassifiedField<DateFormat>;
  location: ClassifiedField<string>;
  nation: ClassifiedField<string>;
  context: ClassifiedField<string>;
}

interface TimelineEvent {
  year: number;
  hemisphere: "N" | "S";
  age: number;
  title: string;
  critical: boolean;
  description: string;
  impact: string;
  consequences: string[];
}

interface FamilyMember {
  relation: string;
  name: ClassifiedField<string>;
  profession: ClassifiedField<string>;
  relevance: string;
  vitalStatus: "Alive" | "Deceased" | "Missing" | "Unknown";
}

interface PersonalityTrait {
  name: string;
  characteristics: string[];
  risksAndBenefits: string;
}

interface EmotionalTrigger {
  trigger: string;
  reaction: string;
}

interface Relationship {
  characterName: string;
  role: string;
  relationType: string;
  description: string;
  significantEvents: string[];
  currentStatus: string;
}

interface CombatPattern {
  preferredStyle: string;
  commonTactics: string[];
  strengths: string[];
  weaknesses: string[];
}

interface Incident {
  title: string;
  date: DateFormat;
  description: string;
  outcome: string;
  analysis: string;
}

interface SpecialElement {
  type: "Artifact" | "Ocular Power" | "Transformation" | "Unique Ability";
  name: string;
  origin: string;
  howObtained: string;
  previousBearers: string[];
  characteristics: string[];
  relationshipWithBearer: string;
  conclaveTheory: string;
  securityNotes: string;
}

interface Skill {
  name: string;
  level: "Basic" | "Intermediate" | "Advanced" | "Master";
}

interface RiskAssessment {
  name: string;
  description: string;
  probability: "Low" | "Medium" | "High";
  impact: "Low" | "Medium" | "High" | "Critical";
  mitigation: string;
}

interface PotentialAssessment {
  name: string;
  description: string;
  developmentProjection: string;
  strategicValue: "Low" | "Medium" | "High" | "Invaluable";
}

interface SpecialProtocol {
  situation: string;
  protocol: string;
}

interface Quote {
  type: "From character" | "From teammate" | "From observer";
  text: string;
  author: string;
  context: string;
}

// Main Dossier Structure

interface CharacterDossier {
  identification: {
    fullName: ClassifiedField<string>;
    codename: string;
    registrationCode: ClassifiedField<string>;
    currentTier: "S" | "A" | "B" | "C" | "D" | "E" | "F";
    operationalStatus: string;
    lastUpdate: DateFormat;
  };

  birth: BirthInfo;

  timeline: TimelineEvent[];

  familyContext: {
    lineage: {
      description: ClassifiedField<string>;
      members: FamilyMember[];
    };
    relevantAspects: {
      title: string;
      description: ClassifiedField<string>;
      impactOnCharacter: string;
    };
    socioeconomicSituation: {
      level: "Low" | "Medium" | "High" | "Elite" | "Unknown";
      description: ClassifiedField<string>;
      impactOnCharacter: string;
    };
    specialNotes: string[];
  };

  psychologicalProfile: {
    personalityTraits: PersonalityTrait[];
    motivations: {
      primary: string;
      secondary: string[];
    };
    fearsAndInsecurities: string[];
    emotionalTriggers: EmotionalTrigger[];
  };

  relationships: Relationship[];

  patterns: {
    inCombat: CombatPattern;
    inExploration: {
      approach: string;
      observedBehaviors: string[];
      riskyTendencies: string[];
    };
    inSocialSituations: {
      socialComfort: "High" | "Medium" | "Low";
      interactionStyle: string;
      behaviors: string[];
    };
    underStress: {
      typicalReaction: string;
      copingMechanisms: string[];
      effectivenessUnderPressure: "High" | "Medium" | "Low";
    };
  };

  incidents: Incident[];

  specialElements: SpecialElement[];

  skills: {
    combat: Skill[];
    nonCombat: Skill[];
    specializedKnowledge: ClassifiedField<string[]>;
    uniqueStrengths: ClassifiedField<string>;
    knownLimitations: ClassifiedField<string>;
  };

  assessment: {
    risks: RiskAssessment[];
    potentials: PotentialAssessment[];
  };

  projections: {
    shortTerm: {
      period: string;
      projections: string[];
      criticalMoments: string[];
    };
    mediumTerm: {
      period: string;
      projections: string[];
      possiblePaths: string[];
    };
    longTerm: {
      period: string;
      projections: string[];
      futureRole: string;
    };
    scenarios: {
      positive: string;
      neutral: string;
      concerning: {
        description: string;
        warningSigns: string[];
      };
    };
  };

  recommendations: {
    forMentor: {
      recipient: string;
      recommendations: string[];
    };
    forCouncil: {
      recommendations: string[];
    };
    forTeam: {
      recommendations: string[];
    };
    specialProtocols: SpecialProtocol[];
  };

  documentation: {
    quotes: Quote[];
    finalNotes: {
      author: {
        name: ClassifiedField<string>;
        position: string;
      };
      date: DateFormat;
      analysis: string;
      witnesses: ClassifiedField<string[]>;
    };
    additionalInformation: ClassifiedField<string>;
  };

  classification: {
    level: "Public" | "Internal" | "Restricted" | "Ultra-Sensitive";
    accessPermitted: string[];
    distribution: string[];
    nextReview: DateFormat;
    frequency: "Monthly" | "Quarterly" | "Semi-Annual" | "Annual";
  };
}

// Empty Template

const emptyDossierTemplate: CharacterDossier = {
  identification: {
    fullName: {
      value: "",
      classified: false,
    },
    codename: "",
    registrationCode: {
      value: "",
      classified: false,
    },
    currentTier: "B",
    operationalStatus: "",
    lastUpdate: {
      day: 0,
      season: "Solaris",
      year: 0,
      hemisphere: "S",
    },
  },

  birth: {
    date: {
      value: {
        day: 0,
        season: "Solaris",
        year: 0,
        hemisphere: "S",
      },
      classified: false,
    },
    location: {
      value: "",
      classified: false,
    },
    nation: {
      value: "",
      classified: false,
    },
    context: {
      value: "",
      classified: false,
    },
  },

  timeline: [
    {
      year: 0,
      hemisphere: "S",
      age: 0,
      title: "",
      critical: false,
      description: "",
      impact: "",
      consequences: [],
    },
  ],

  familyContext: {
    lineage: {
      description: {
        value: "",
        classified: false,
      },
      members: [
        {
          relation: "",
          name: {
            value: "",
            classified: false,
          },
          profession: {
            value: "",
            classified: false,
          },
          relevance: "",
          vitalStatus: "Alive",
        },
      ],
    },
    relevantAspects: {
      title: "",
      description: {
        value: "",
        classified: false,
      },
      impactOnCharacter: "",
    },
    socioeconomicSituation: {
      level: "Medium",
      description: {
        value: "",
        classified: false,
      },
      impactOnCharacter: "",
    },
    specialNotes: [],
  },

  psychologicalProfile: {
    personalityTraits: [
      {
        name: "",
        characteristics: [],
        risksAndBenefits: "",
      },
    ],
    motivations: {
      primary: "",
      secondary: [],
    },
    fearsAndInsecurities: [],
    emotionalTriggers: [
      {
        trigger: "",
        reaction: "",
      },
    ],
  },

  relationships: [
    {
      characterName: "",
      role: "",
      relationType: "",
      description: "",
      significantEvents: [],
      currentStatus: "",
    },
  ],

  patterns: {
    inCombat: {
      preferredStyle: "",
      commonTactics: [],
      strengths: [],
      weaknesses: [],
    },
    inExploration: {
      approach: "",
      observedBehaviors: [],
      riskyTendencies: [],
    },
    inSocialSituations: {
      socialComfort: "Medium",
      interactionStyle: "",
      behaviors: [],
    },
    underStress: {
      typicalReaction: "",
      copingMechanisms: [],
      effectivenessUnderPressure: "Medium",
    },
  },

  incidents: [
    {
      title: "",
      date: {
        day: 0,
        season: "Solaris",
        year: 0,
        hemisphere: "S",
      },
      description: "",
      outcome: "",
      analysis: "",
    },
  ],

  specialElements: [
    {
      type: "Artifact",
      name: "",
      origin: "",
      howObtained: "",
      previousBearers: [],
      characteristics: [],
      relationshipWithBearer: "",
      conclaveTheory: "",
      securityNotes: "",
    },
  ],

  skills: {
    combat: [
      {
        name: "",
        level: "Basic",
      },
    ],
    nonCombat: [
      {
        name: "",
        level: "Basic",
      },
    ],
    specializedKnowledge: {
      value: [],
      classified: false,
    },
    uniqueStrengths: {
      value: "",
      classified: false,
    },
    knownLimitations: {
      value: "",
      classified: false,
    },
  },

  assessment: {
    risks: [
      {
        name: "",
        description: "",
        probability: "Low",
        impact: "Low",
        mitigation: "",
      },
    ],
    potentials: [
      {
        name: "",
        description: "",
        developmentProjection: "",
        strategicValue: "Medium",
      },
    ],
  },

  projections: {
    shortTerm: {
      period: "1-2 years",
      projections: [],
      criticalMoments: [],
    },
    mediumTerm: {
      period: "3-5 years",
      projections: [],
      possiblePaths: [],
    },
    longTerm: {
      period: "5+ years",
      projections: [],
      futureRole: "",
    },
    scenarios: {
      positive: "",
      neutral: "",
      concerning: {
        description: "",
        warningSigns: [],
      },
    },
  },

  recommendations: {
    forMentor: {
      recipient: "",
      recommendations: [],
    },
    forCouncil: {
      recommendations: [],
    },
    forTeam: {
      recommendations: [],
    },
    specialProtocols: [
      {
        situation: "",
        protocol: "",
      },
    ],
  },

  documentation: {
    quotes: [
      {
        type: "From character",
        text: "",
        author: "",
        context: "",
      },
    ],
    finalNotes: {
      author: {
        name: {
          value: "",
          classified: false,
        },
        position: "",
      },
      date: {
        day: 0,
        season: "Solaris",
        year: 0,
        hemisphere: "S",
      },
      analysis: "",
      witnesses: {
        value: [],
        classified: false,
      },
    },
    additionalInformation: {
      value: "",
      classified: false,
    },
  },

  classification: {
    level: "Internal",
    accessPermitted: [],
    distribution: [],
    nextReview: {
      day: 0,
      season: "Solaris",
      year: 0,
      hemisphere: "S",
    },
    frequency: "Quarterly",
  },
};

export type { CharacterDossier };
export { emptyDossierTemplate };
