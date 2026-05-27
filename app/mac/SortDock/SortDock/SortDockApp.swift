//
//  SortDockApp.swift
//  SortDock
//
//  Created by DaQuan Louden on 5/27/26.
//

import SwiftUI

@main
struct SortDockApp: App {
    @StateObject private var store = SortDockStore()

    var body: some Scene {
        WindowGroup("SortDock", id: "main") {
            MainWindowView()
                .environmentObject(store)
                .frame(minWidth: 620, minHeight: 460)
                .onAppear {
                    store.start()
                }
        }
        .defaultSize(width: 680, height: 520)

        MenuBarExtra("SortDock", systemImage: "tray.full") {
            MenuBarPopoverView()
                .environmentObject(store)
        }
    }
}
