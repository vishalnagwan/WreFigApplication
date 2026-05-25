export interface CreateFeedbackDto {
  page:     string;
  category: string;
  comment:  string;
}

export interface FeedbackItemDto {
  id:            number;
  page:          string;
  category:      string;
  comment:       string;
  userName:      string;
  createdAt:     string;
  isImplemented: boolean;
}
