export interface SearchProps {
  value: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export interface ImageWrapperProps {
  title: string
  img?: string
}

export interface HistoryCardProps {
  keyword: string
  onShow: (keyword: string) => void
}

export interface HistoryResultsProps {
  images: any[],
}