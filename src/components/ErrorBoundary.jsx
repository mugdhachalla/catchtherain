import React from "react";

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error, info) {
    // helpful console for debugging
    // eslint-disable-next-line no-console
    console.error("Chart error:", error, info?.componentStack);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 rounded-lg border bg-red-50 text-red-700 text-sm">
          Chart failed to render. Please try different inputs.
        </div>
      );
    }
    return this.props.children;
  }
}
