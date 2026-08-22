//
//  SortDockTests.swift
//  SortDockTests
//
//  Created by DaQuan Louden on 8/21/26.
//

import Foundation
import Testing
@testable import SortDock

struct SortDockTests {

    @Test @MainActor func promptQueueUsesFIFOOrderAndExactOnceResolution() {
        let destination = DestinationFolder(name: "Documents")
        let queue = PendingMovePromptQueue()
        let first = PendingMovePrompt(fileURL: URL(fileURLWithPath: "/tmp/invoice.pdf"), watchedFolderName: "Demo", destination: destination, activityID: UUID())
        let second = PendingMovePrompt(fileURL: URL(fileURLWithPath: "/tmp/receipt.pdf"), watchedFolderName: "Demo", destination: destination, activityID: UUID())
        queue.enqueue(first)
        queue.enqueue(second)
        #expect(queue.current?.id == first.id)
        #expect(queue.resolveCurrent()?.id == first.id)
        #expect(queue.current?.id == second.id)
        #expect(queue.resolveCurrent()?.id == second.id)
        #expect(queue.resolveCurrent() == nil)
    }

    @Test func keywordRulesWinOverFileTypeRules() {
        let documents = DestinationFolder(name: "Documents")
        let pdfs = DestinationFolder(name: "PDFs")
        let keyword = KeywordRule(keywords: ["invoice"], destinationID: documents.id)
        let typeRule = RoutingRule(extensions: ["pdf"], destinationID: pdfs.id)
        let destinationID = FileRoutingResolver.destinationID(
            for: URL(fileURLWithPath: "/tmp/client-invoice.pdf"),
            keywordRules: [keyword],
            fileTypeRules: [typeRule],
            defaultDestinationID: nil
        )
        #expect(destinationID == documents.id)
    }

}
