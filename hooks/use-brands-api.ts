import { useAuthenticatedQuery } from '@/hooks/use-api';

export interface Store {
  id: string;
  name: string;
  code: string;
}

export interface Brand {
  id: string;
  name: string;
  code: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  stores: Store[];
}
/* 
{
    "id": "ebd8357e-28e4-4bf0-926f-452ffb112de6",
    "title": "Daily Quality Check",
    "description": "Daily quality assessment checklist for store operations",
    "status": "ACTIVE",
    "createdAt": "2026-01-13T16:27:41.917Z",
    "updatedAt": "2026-01-13T16:27:41.917Z",
    "questions": [
        {
            "id": "45c2f08a-76d1-4ffc-bee8-da87b30daa24",
            "questionnaireId": "ebd8357e-28e4-4bf0-926f-452ffb112de6",
            "key": "date",
            "label": "Date",
            "description": "Date of the quality check",
            "type": "DATE",
            "required": true,
            "order": 1,
            "options": null,
            "placeholder": null,
            "min": null,
            "max": null,
            "defaultValue": null,
            "validation": null,
            "dependsOn": null,
            "dependsValue": null,
            "createdAt": "2026-01-13T16:27:41.917Z",
            "updatedAt": "2026-01-13T16:27:41.917Z"
        },
        {
            "id": "28190e23-d335-4e90-9a56-7a720702802d",
            "questionnaireId": "ebd8357e-28e4-4bf0-926f-452ffb112de6",
            "key": "tea_quality",
            "label": "Tea Quality",
            "description": "How would you rate the tea quality today?",
            "type": "SELECT",
            "required": true,
            "order": 2,
            "options": [
                {
                    "label": "Excellent",
                    "value": "excellent"
                },
                {
                    "label": "Good",
                    "value": "good"
                },
                {
                    "label": "Fair",
                    "value": "fair"
                },
                {
                    "label": "Poor",
                    "value": "poor"
                }
            ],
            "placeholder": null,
            "min": null,
            "max": null,
            "defaultValue": null,
            "validation": null,
            "dependsOn": null,
            "dependsValue": null,
            "createdAt": "2026-01-13T16:27:41.917Z",
            "updatedAt": "2026-01-13T16:27:41.917Z"
        },
        {
            "id": "416bb910-951e-4cec-afd0-5d003d2e52c3",
            "questionnaireId": "ebd8357e-28e4-4bf0-926f-452ffb112de6",
            "key": "equipment_status",
            "label": "Equipment Status",
            "description": "Is all equipment functioning properly?",
            "type": "SELECT",
            "required": true,
            "order": 3,
            "options": [
                {
                    "label": "All Working",
                    "value": "all_working"
                },
                {
                    "label": "Minor Issues",
                    "value": "minor_issues"
                },
                {
                    "label": "Major Issues",
                    "value": "major_issues"
                }
            ],
            "placeholder": null,
            "min": null,
            "max": null,
            "defaultValue": null,
            "validation": null,
            "dependsOn": null,
            "dependsValue": null,
            "createdAt": "2026-01-13T16:27:41.917Z",
            "updatedAt": "2026-01-13T16:27:41.917Z"
        },
        {
            "id": "67b11162-af8d-435f-a463-e124627d09b5",
            "questionnaireId": "ebd8357e-28e4-4bf0-926f-452ffb112de6",
            "key": "staff_cleanliness",
            "label": "Staff Cleanliness",
            "description": "Are all staff following cleanliness protocols?",
            "type": "CHECKBOX",
            "required": true,
            "order": 4,
            "options": [
                {
                    "label": "Uniforms Clean",
                    "value": "uniforms_clean"
                },
                {
                    "label": "Hands Washed Regularly",
                    "value": "hands_washed"
                },
                {
                    "label": "Hair Properly Contained",
                    "value": "hair_contained"
                }
            ],
            "placeholder": null,
            "min": null,
            "max": null,
            "defaultValue": null,
            "validation": null,
            "dependsOn": null,
            "dependsValue": null,
            "createdAt": "2026-01-13T16:27:41.917Z",
            "updatedAt": "2026-01-13T16:27:41.917Z"
        },
        {
            "id": "a1e20c0a-b91a-43fb-8926-7fef9681a44f",
            "questionnaireId": "ebd8357e-28e4-4bf0-926f-452ffb112de6",
            "key": "notes",
            "label": "Additional Notes",
            "description": "Any additional observations or issues",
            "type": "TEXTAREA",
            "required": false,
            "order": 5,
            "options": null,
            "placeholder": "Enter any additional notes...",
            "min": null,
            "max": null,
            "defaultValue": null,
            "validation": null,
            "dependsOn": null,
            "dependsValue": null,
            "createdAt": "2026-01-13T16:27:41.917Z",
            "updatedAt": "2026-01-13T16:27:41.917Z"
        }
    ],
    "_count": {
        "submissions": 0
    }
}
*/

export interface Question {
  id: string;
  questionId: string;
  key: string;
  label: string;
  description: string;
  type: string;
  required: boolean;
  order: number;
  options: Option[];
  placeholder: string;
  min: number;
  max: number;
  defaultValue: string;
  validation: string;
  dependsOn: string;
  dependsValue: string;
  createdAt: string;
  updatedAt: string;
}

export interface Option {
  label: string;
  value: string;
}

export interface Questionnaire {
  id: string;
  title: string;
  description?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  questions: Question[];
  _count: {
    submissions: number;
  };
}

interface QuestionnaireApiResponse {
  status: string;
  data: Questionnaire;
}

interface BrandsApiResponse {
  status: string;
  data: Brand[];
}

/**
 * Hook to fetch all brands with nested stores
 */
export function useBrands() {
  return useAuthenticatedQuery<BrandsApiResponse>(['brands'], '/api/v1/brands');
}

/**
 * Hook to get brands data (extracted from response)
 */
export function useBrandsData() {
  const { data, ...rest } = useBrands();
  return {
    ...rest,
    data: data?.data || [],
  };
}

interface QuestionnairesApiResponse {
  status: string;
  data: Questionnaire[];
}

/**
 * Hook to fetch questionnaires by store (using the stores endpoint as specified)
 */
export function useQuestionnairesByStore(storeId: string | null) {
  const { data, ...rest } = useAuthenticatedQuery<QuestionnairesApiResponse>(
    ['questionnaires', storeId || ''],
    `/api/v1/questionnaires/stores/${storeId}`,
    {
      enabled: !!storeId,
    }
  );
  return {
    ...rest,
    data: data?.data || [],
  };
}

/**
 * Hook to fetch questionnaire by ID
 */
export function useQuestionnaire(questionnaireId: string | null) {
  return useAuthenticatedQuery<QuestionnaireApiResponse>(
    ['questionnaires', questionnaireId || ''],
    `/api/v1/questionnaires/${questionnaireId}`,
    {
      enabled: !!questionnaireId,
    }
  );
}
