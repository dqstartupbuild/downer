import SwiftUI

struct MainWindowView: View {
    @EnvironmentObject private var store: SortDockStore
    @State private var destinationEditorDestination: DestinationFolder?
    @State private var isDestinationEditorPresented = false
    @State private var isRuleEditorPresented = false
    @State private var ruleEditorRule: RoutingRule?

    var body: some View {
        VStack(spacing: 0) {
            StatusStripView()
            Divider()
            ScrollView(.vertical) {
                HStack(alignment: .top, spacing: 16) {
                    VStack(alignment: .leading, spacing: 16) {
                        WatchFolderPanel()
                        DestinationListView(
                            onAdd: openAddDestination,
                            onRename: openRenameDestination
                        )
                    }
                    .frame(width: 220)

                    VStack(alignment: .leading, spacing: 16) {
                        RoutingRailView(
                            onAddRule: openAddRule,
                            onEditRule: openEditRule
                        )
                        BehaviorSettingsView()
                        AppearanceSettingsView()
                    }
                    .frame(maxWidth: .infinity, alignment: .topLeading)
                }
                .padding(16)
                .frame(maxWidth: .infinity, alignment: .topLeading)
            }
            Divider()
            ActivityStatusLine()
        }
        .background(DesignTokens.raisedBackground)
        .sheet(isPresented: $isRuleEditorPresented) {
            RuleEditorSheet(rule: ruleEditorRule)
                .environmentObject(store)
        }
        .sheet(isPresented: $isDestinationEditorPresented) {
            DestinationEditorSheet(destination: destinationEditorDestination)
                .environmentObject(store)
        }
    }

    private func openAddDestination() {
        destinationEditorDestination = nil
        isDestinationEditorPresented = true
    }

    private func openAddRule() {
        ruleEditorRule = nil
        isRuleEditorPresented = true
    }

    private func openEditRule(_ rule: RoutingRule) {
        ruleEditorRule = rule
        isRuleEditorPresented = true
    }

    private func openRenameDestination(_ destination: DestinationFolder) {
        destinationEditorDestination = destination
        isDestinationEditorPresented = true
    }
}
