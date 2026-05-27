import Foundation

struct ActivityRecord: Codable, Equatable, Identifiable {
    let id: UUID
    let message: String
    let date: Date

    init(id: UUID = UUID(), message: String, date: Date = Date()) {
        self.id = id
        self.message = message
        self.date = date
    }
}
