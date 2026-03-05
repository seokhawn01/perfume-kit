import { Container } from './container'

export function Footer() {
  return (
    <footer className="border-t">
      <Container>
        <div className="py-8">
          <div className="text-center">
            <p className="text-muted-foreground text-sm">
              &copy; 2026 Perfume Kit. 나만의 향수 이야기를 기록하세요.
            </p>
          </div>
        </div>
      </Container>
    </footer>
  )
}
