import SwiftUI

struct DestinationListView: View {
    let onAdd: () -> Void
    let onRename: (DestinationFolder) -> Void

    @EnvironmentObject private var store: SortDockStore

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                SectionTitleView(title: "Destinations")
                Spacer()
                Button(action: onAdd) {
                    Image(systemName: "plus")
                }
                .buttonStyle(.borderless)
                .help("Add destination")
            }

            ScrollView {
                VStack(spacing: 5) {
                    ForEach(store.destinations) { destination in
                        DestinationRowView(
                            destination: destination,
                            isSelected: store.selectedDestinationID == destination.id,
                            onSelect: {
                                store.selectedDestinationID = destination.id
                            },
                            onRename: {
                                onRename(destination)
                            },
                            onDelete: {
                                store.removeDestination(destination)
                            }
                        )
                    }
                }
                .padding(.vertical, 1)
            }
        }
    }
}
