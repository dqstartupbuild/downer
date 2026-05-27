import SwiftUI

struct DestinationEditorSheet: View {
    let destination: DestinationFolder?

    @Environment(\.dismiss) private var dismiss
    @EnvironmentObject private var store: SortDockStore
    @State private var name: String

    init(destination: DestinationFolder?) {
        self.destination = destination
        _name = State(initialValue: destination?.name ?? "")
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 16) {
            Text(destination == nil ? "Add Destination" : "Rename Destination")
                .font(.title3.weight(.semibold))

            TextField("Folder name", text: $name)

            HStack {
                Spacer()
                Button("Cancel") {
                    dismiss()
                }
                Button(destination == nil ? "Add" : "Save") {
                    save()
                }
                .buttonStyle(PrimaryButtonStyle())
                .disabled(name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
            }
        }
        .padding(20)
        .frame(width: 360)
    }

    private func save() {
        if let destination {
            store.renameDestination(destination, name: name)
        } else {
            store.addDestination(named: name)
        }

        dismiss()
    }
}
