/**
 * Normalize a date value to a Date object
 * Handles Firebase Timestamp, ISO strings, and Date objects
 */
export function normalizeDateToDate(dateValue) {
  if (!dateValue) return null
  
  // If it's a Firebase Timestamp, convert to Date
  if (dateValue && typeof dateValue.toDate === 'function') {
    return dateValue.toDate()
  }
  
  // If it's already a Date object, return as is
  if (dateValue instanceof Date) {
    return dateValue
  }
  
  // If it's a string, try to parse it
  if (typeof dateValue === 'string') {
    return new Date(dateValue)
  }
  
  return null
}

/**
 * Get a Date object from a date value, handling various formats
 */
export function getDate(dateValue) {
  const normalized = normalizeDateToDate(dateValue)
  return normalized || new Date(0) // Return epoch date if invalid
}

