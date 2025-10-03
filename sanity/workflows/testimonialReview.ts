import { DocumentActionComponent, useDocumentOperation } from 'sanity'

// Approve testimonial action
export const ApproveAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const { draft, published } = props

  const currentStatus = draft?.status || published?.status

  // Only show for pending or rejected testimonials
  if (currentStatus === 'approved') {
    return null
  }

  return {
    label: 'אשר (Approve)',
    icon: () => '✅',
    tone: 'positive',
    onHandle: () => {
      // Update status and metadata
      patch.execute([
        { set: { status: 'approved' } },
        { set: { reviewedBy: 'Admin' } }, // TODO: Get actual user name
        { set: { reviewedAt: new Date().toISOString() } },
      ])

      // Publish after approving
      if (draft) {
        publish.execute()
      }

      props.onComplete()
    },
  }
}

// Reject testimonial action
export const RejectAction: DocumentActionComponent = (props) => {
  const { patch } = useDocumentOperation(props.id, props.type)
  const { draft, published } = props

  const currentStatus = draft?.status || published?.status

  // Only show for pending or approved testimonials
  if (currentStatus === 'rejected') {
    return null
  }

  return {
    label: 'דחה (Reject)',
    icon: () => '❌',
    tone: 'critical',
    onHandle: () => {
      // Prompt for rejection reason
      const notes = window.prompt('הזן סיבה לדחייה (אופציונלי):')

      // Update status and metadata
      const patches: any[] = [
        { set: { status: 'rejected' } },
        { set: { reviewedBy: 'Admin' } }, // TODO: Get actual user name
        { set: { reviewedAt: new Date().toISOString() } },
      ]

      if (notes) {
        patches.push({ set: { reviewNotes: notes } })
      }

      patch.execute(patches)
      props.onComplete()
    },
  }
}

// Reset to pending action
export const ResetToPendingAction: DocumentActionComponent = (props) => {
  const { patch } = useDocumentOperation(props.id, props.type)
  const { draft, published } = props

  const currentStatus = draft?.status || published?.status

  // Only show for approved or rejected testimonials
  if (currentStatus === 'pending') {
    return null
  }

  return {
    label: 'אפס לממתין (Reset to Pending)',
    icon: () => '⏳',
    tone: 'caution',
    onHandle: () => {
      // Reset status
      patch.execute([
        { set: { status: 'pending' } },
        { unset: ['reviewedBy'] },
        { unset: ['reviewedAt'] },
        { unset: ['reviewNotes'] },
      ])

      props.onComplete()
    },
  }
}

// Quick approve and feature action
export const ApproveAndFeatureAction: DocumentActionComponent = (props) => {
  const { patch, publish } = useDocumentOperation(props.id, props.type)
  const { draft, published } = props

  const currentStatus = draft?.status || published?.status

  // Only show for pending testimonials
  if (currentStatus !== 'pending') {
    return null
  }

  return {
    label: 'אשר והצג בדף הבית (Approve & Feature)',
    icon: () => '⭐',
    tone: 'positive',
    onHandle: () => {
      // Approve, feature, and publish
      patch.execute([
        { set: { status: 'approved' } },
        { set: { featured: true } },
        { set: { reviewedBy: 'Admin' } }, // TODO: Get actual user name
        { set: { reviewedAt: new Date().toISOString() } },
      ])

      // Publish after approving
      if (draft) {
        publish.execute()
      }

      props.onComplete()
    },
  }
}
