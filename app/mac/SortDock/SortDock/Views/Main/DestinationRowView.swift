import SwiftUI

struct DestinationRowView: View {
    let destination: DestinationFolder
    let isSelected: Bool
    let onSelect: () -> Void
    let onRename: () -> Void
    let onDelete: () -> Void

    var body: some View {
        Button(action: onSelect) {
            HStack(spacing: 8) {
                RoundedRectangle(cornerRadius: 2)
                    .fill(isSelected ? DesignTokens.accent : Color.clear)
                    .frame(width: 3)
                Image(systemName: "folder.fill")
                    .foregroundStyle(DesignTokens.accent)
                Text(destination.name)
                    .lineLimit(1)
                Spacer()
            }
            .padding(.vertical, 6)
            .padding(.trailing, 8)
            .contentShape(Rectangle())
        }
        .buttonStyle(.plain)
        .background(
            RoundedRectangle(cornerRadius: 6, style: .continuous)
                .fill(isSelected ? DesignTokens.panelBackground : Color.clear)
        )
        .contextMenu {
            Button("Rename", action: onRename)
            Button("Remove", role: .destructive, action: onDelete)
        }
    }
}
