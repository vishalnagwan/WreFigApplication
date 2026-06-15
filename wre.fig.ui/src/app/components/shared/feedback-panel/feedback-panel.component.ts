import { Component, Input, Output, EventEmitter, OnChanges, inject } from '@angular/core';

import { FormsModule }     from '@angular/forms';
import { FeedbackService } from '../../../services/feedback.service';
import { FeedbackItemDto } from '../../../models/feedback.model';
import { FEEDBACK_CATEGORIES, FEEDBACK_PLACEHOLDERS } from '../../../constant';

@Component({
  selector:   'app-feedback-panel',
  standalone: true,
  imports: [FormsModule],
  styles: [`
    .fb-overlay {
      position: fixed; inset: 0; z-index: 900;
      background: rgba(0,0,0,.25);
    }
    .fb-panel {
      position: fixed; top: 0; right: 0; bottom: 0;
      width: 440px; max-width: 95vw;
      background: var(--paper);
      box-shadow: -4px 0 24px rgba(0,0,0,.12);
      z-index: 901;
      display: flex; flex-direction: column;
    }
    .fb-header {
      display: flex; align-items: center;
      padding: 1rem 1.25rem;
      border-bottom: 1px solid var(--border);
      gap: .75rem; flex-shrink: 0;
    }
    .fb-header h2 { flex: 1; margin: 0; font-size: 1rem; font-weight: 700; }
    .fb-page-pill {
      font-size: .72rem; font-weight: 600;
      padding: .15rem .55rem; border-radius: 999px;
      background: var(--accent-light, #ede9fe);
      color: var(--accent, #6d28d9);
    }

    .fb-body {
      flex: 1; overflow-y: auto;
      padding: .5rem 0;
    }
    .fb-loading {
      text-align: center; padding: 2rem; color: #9ca3af; font-size: .88rem;
    }
    .fb-load-error {
      margin: 1rem 1.25rem; padding: .6rem .9rem;
      border-radius: 6px; background: #fef2f2; border: 1px solid #fca5a5;
      color: #dc2626; font-size: .82rem;
    }

    /* Category section */
    .fb-cat-section {
      border-bottom: 1px solid var(--border, #e5e7eb);
    }
    .fb-cat-header {
      display: flex; align-items: center; gap: .6rem;
      padding: .7rem 1.25rem; cursor: pointer;
      user-select: none;
    }
    .fb-cat-header:hover { background: #f9fafb; }
    .fb-cat-toggle {
      font-size: .72rem; color: #9ca3af; width: .8rem; flex-shrink: 0;
    }
    .fb-cat-name {
      flex: 1; font-size: .88rem; font-weight: 600; color: var(--ink, #1f2937);
    }
    .fb-cat-count {
      font-size: .7rem; font-weight: 700;
      background: #e0e7ff; color: #3730a3;
      padding: .1rem .45rem; border-radius: 999px;
    }
    .fb-cat-new-badge {
      font-size: .65rem; font-weight: 700;
      background: #d1fae5; color: #065f46;
      padding: .1rem .4rem; border-radius: 999px;
    }

    .fb-cat-body {
      padding: 0 1.25rem .75rem;
    }

    /* Existing entries */
    .fb-entry {
      padding: .6rem .75rem;
      background: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 6px;
      margin-bottom: .5rem;
    }
    .fb-entry-comment {
      font-size: .84rem; color: #1f2937; line-height: 1.5;
      white-space: pre-wrap;
    }
    .fb-entry-meta {
      margin-top: .3rem;
      font-size: .72rem; color: #9ca3af;
    }
    .fb-entry-implemented {
      display: inline-flex; align-items: center; gap: .25rem;
      font-size: .68rem; font-weight: 700;
      color: #059669; margin-left: .5rem;
    }

    /* Empty state */
    .fb-cat-empty {
      font-size: .8rem; color: #9ca3af; font-style: italic;
      padding: .25rem 0 .5rem;
    }

    /* Add trigger */
    .fb-add-trigger {
      display: inline-flex; align-items: center; gap: .35rem;
      font-size: .8rem; font-weight: 600; color: var(--accent, #6d28d9);
      cursor: pointer; padding: .25rem 0; margin-top: .15rem;
      background: none; border: none;
    }
    .fb-add-trigger:hover { opacity: .75; }

    /* Inline add form */
    .fb-add-form {
      margin-top: .35rem;
      border: 1px solid var(--accent, #6d28d9);
      border-radius: 6px;
      overflow: hidden;
    }
    .fb-add-form textarea {
      display: block; width: 100%; box-sizing: border-box;
      padding: .6rem .75rem;
      font-size: .84rem; font-family: inherit;
      border: none; resize: vertical; min-height: 80px;
      background: var(--paper); color: var(--ink, #1f2937);
    }
    .fb-add-form textarea:focus { outline: none; }
    .fb-add-form-footer {
      display: flex; align-items: center; gap: .5rem;
      padding: .4rem .65rem;
      background: #f9fafb; border-top: 1px solid #e5e7eb;
    }
    .fb-char-count {
      margin-left: auto; font-size: .72rem; color: #9ca3af;
    }
    .fb-char-count.warn { color: #d97706; }
    .fb-submit-error {
      font-size: .75rem; color: #dc2626;
      margin-top: .35rem;
    }
  `],
  template: `
<!-- Overlay -->
<div class="fb-overlay" (click)="close.emit()"></div>

<!-- Panel -->
<div class="fb-panel">
  <div class="fb-header">
    <h2>Feedback</h2>
    <span class="fb-page-pill">{{page}}</span>
    <button class="btn-icon" (click)="close.emit()">✕</button>
  </div>

  <div class="fb-body">

    @if (loading) {
      <div class="fb-loading">Loading feedback…</div>
    }
    @if (loadError) {
      <div class="fb-load-error">{{loadError}}</div>
    }

    @if (!loading && !loadError) {
      <div>
        @for (cat of categories; track cat) {
          <div class="fb-cat-section">
            <!-- Category header (always visible, click to expand/collapse) -->
            <div class="fb-cat-header" (click)="toggleExpand(cat)">
              <span class="fb-cat-toggle">{{expanded.has(cat) ? '▾' : '▸'}}</span>
              <span class="fb-cat-name">{{cat}}</span>
              @if (entriesFor(cat).length > 0) {
                <span class="fb-cat-count">
                  {{entriesFor(cat).length}}
                </span>
              }
              @if (newlyAdded.has(cat)) {
                <span class="fb-cat-new-badge">✓ Added</span>
              }
            </div>
            <!-- Expanded body -->
            @if (expanded.has(cat)) {
              <div class="fb-cat-body">
                <!-- Existing entries -->
                @for (e of entriesFor(cat); track e) {
                  <div class="fb-entry">
                    <div class="fb-entry-comment">{{e.comment}}</div>
                    <div class="fb-entry-meta">
                      {{e.userName}} · {{formatDate(e.createdAt)}}
                      @if (e.isImplemented) {
                        <span class="fb-entry-implemented">✓ Implemented</span>
                      }
                    </div>
                  </div>
                }
                <!-- Empty state (only when add form is closed) -->
                @if (entriesFor(cat).length === 0 && activeAddCat !== cat) {
                  <div class="fb-cat-empty"
                    >
                    No feedback yet — be the first to add one.
                  </div>
                }
                <!-- Inline add form -->
                @if (activeAddCat === cat) {
                  <div class="fb-add-form">
                    <textarea [(ngModel)]="newComment"
                      [placeholder]="placeholderFor(cat)"
                      (keydown.escape)="cancelAdd()">
                    </textarea>
                    <div class="fb-add-form-footer">
                      <button class="btn-primary btn-sm"
                        (click)="submit(cat)"
                        [disabled]="saving || !newComment.trim()">
                        {{saving ? 'Submitting…' : 'Submit'}}
                      </button>
                      <button class="btn-ghost btn-sm" (click)="cancelAdd()">Cancel</button>
                      <span class="fb-char-count" [class.warn]="newComment.length > 800">
                        {{newComment.length}} / 1000
                      </span>
                    </div>
                  </div>
                }
                <!-- Submit error -->
                @if (submitError && activeAddCat === cat) {
                  <div class="fb-submit-error">
                    {{submitError}}
                  </div>
                }
                <!-- Add trigger button -->
                @if (activeAddCat !== cat) {
                  <button class="fb-add-trigger"
                    (click)="startAdd(cat)">
                    ＋ Add feedback
                  </button>
                }
              </div>
            }
          </div>
        }
      </div>
    }

  </div>
</div>
`
})
export class FeedbackPanelComponent implements OnChanges {
  @Input() page = 'Home';
  @Output() close = new EventEmitter<void>();

  private feedbackSvc = inject(FeedbackService);

  loading       = true;
  loadError     = '';
  submitError   = '';
  saving        = false;

  entries:      FeedbackItemDto[] = [];
  expanded      = new Set<string>();
  newlyAdded    = new Set<string>();
  activeAddCat: string | null = null;
  newComment    = '';

  get categories(): string[] {
    return FEEDBACK_CATEGORIES[this.page] ?? FEEDBACK_CATEGORIES['Home'];
  }

  entriesFor(cat: string): FeedbackItemDto[] {
    return this.entries.filter(e => e.category === cat);
  }

  placeholderFor(cat: string): string {
    return FEEDBACK_PLACEHOLDERS[cat] ?? 'Describe what you observed, what\'s missing, or what could be improved…';
  }

  ngOnChanges(): void {
    this.reset();
    this.load();
  }

  private reset(): void {
    this.loading      = true;
    this.loadError    = '';
    this.submitError  = '';
    this.entries      = [];
    this.expanded     = new Set();
    this.newlyAdded   = new Set();
    this.activeAddCat = null;
    this.newComment   = '';
  }

  private load(): void {
    this.feedbackSvc.getByPage(this.page).subscribe({
      next: data => {
        this.entries = data;
        this.loading = false;
        // Auto-expand categories that already have entries
        this.categories.forEach(cat => {
          if (this.entriesFor(cat).length > 0) this.expanded.add(cat);
        });
      },
      error: () => {
        this.loading   = false;
        this.loadError = 'Could not load feedback. Please try again.';
      }
    });
  }

  toggleExpand(cat: string): void {
    if (this.expanded.has(cat)) {
      this.expanded.delete(cat);
      if (this.activeAddCat === cat) this.cancelAdd();
    } else {
      this.expanded.add(cat);
    }
  }

  startAdd(cat: string): void {
    this.activeAddCat = cat;
    this.newComment   = '';
    this.submitError  = '';
    if (!this.expanded.has(cat)) this.expanded.add(cat);
  }

  cancelAdd(): void {
    this.activeAddCat = null;
    this.newComment   = '';
    this.submitError  = '';
  }

  submit(cat: string): void {
    const comment = this.newComment.trim();
    if (!comment) return;
    if (comment.length > 1000) {
      this.submitError = 'Comment must be 1000 characters or fewer.';
      return;
    }

    this.saving      = true;
    this.submitError = '';

    this.feedbackSvc.submit({ page: this.page, category: cat, comment }).subscribe({
      next: () => {
        // Optimistically add entry so it shows immediately
        this.entries.push({
          id:            0,
          page:          this.page,
          category:      cat,
          comment,
          userName:      'You (just now)',
          createdAt:     new Date().toISOString(),
          isImplemented: false
        });
        this.newlyAdded.add(cat);
        this.saving       = false;
        this.activeAddCat = null;
        this.newComment   = '';
        // Clear the green "Added" badge after 4 seconds
        setTimeout(() => this.newlyAdded.delete(cat), 4000);
      },
      error: () => {
        this.saving      = false;
        this.submitError = 'Submission failed. Please try again.';
      }
    });
  }

  formatDate(iso: string): string {
    if (!iso) return '';
    return new Date(iso).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  }
}
