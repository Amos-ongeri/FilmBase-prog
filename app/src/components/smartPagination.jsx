import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export const SmartPagination = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = []

  // Always show first page
  pages.push(1)

  // Show left ellipsis
  if (currentPage > 3) {
    pages.push("left-ellipsis")
  }

  // Middle pages
  const startPage = Math.max(2, currentPage - 1)
  const endPage = Math.min(totalPages - 1, currentPage + 1)

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i)
  }

  // Show right ellipsis
  if (currentPage < totalPages - 2) {
    pages.push("right-ellipsis")
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages)
  }

  return (
    <Pagination>
      <PaginationContent>
        {/* Previous */}
        <PaginationItem>
          <PaginationPrevious
            onClick={(e) => {
              e.preventDefault()

              if (currentPage > 1) {
                onPageChange(currentPage - 1)
              }
            }}
          />
        </PaginationItem>

        {/* Dynamic Pages */}
        {pages.map((page, index) => (
          <PaginationItem key={index}>
            {typeof page === "string" ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === currentPage}
                onClick={(e) => {
                  e.preventDefault()
                  onPageChange(page)
                }}
                className={`min-w-fit px-1 md:px-2 truncate`}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Next */}
        <PaginationItem>
          <PaginationNext
            onClick={(e) => {
              e.preventDefault()

              if (currentPage < totalPages) {
                onPageChange(currentPage + 1)
              }
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}