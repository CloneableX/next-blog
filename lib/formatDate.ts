export const formatDate = (dateString: string) => {
  return Intl.DateTimeFormat('zh-Hans-CN', {dateStyle: 'long'}).format(new Date(dateString))
}
